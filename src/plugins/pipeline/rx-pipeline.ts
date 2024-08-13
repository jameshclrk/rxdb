import {
    BehaviorSubject,
    Subject,
    Subscription,
    filter,
    firstValueFrom,
    race
} from 'rxjs';
import type {
    InternalStoreDocType,
    RxCollection,
    RxDocument,
    RxDocumentData
} from '../../types';
import type {
    CheckpointDocData,
    RxPipelineHandler,
    RxPipelineOptions
} from './types';
import {
    PROMISE_RESOLVE_VOID,
    clone,
    createRevision,
    ensureNotFalsy,
    lastOfArray,
    nameFunction,
    now,
    promiseWait,
    randomCouchString
} from '../utils/index.ts';
import { getChangedDocumentsSince } from '../../rx-storage-helper.ts';
import { mapDocumentsDataToCacheDocs } from '../../doc-cache.ts';
import { getPrimaryKeyOfInternalDocument } from '../../rx-database-internal-store.ts';
import { FLAGGED_FUNCTIONS, blockFlaggedFunctionKey, releaseFlaggedFunctionKey } from './flagged-functions.ts';
export const RX_PIPELINE_CHECKPOINT_CONTEXT = 'rx-pipeline-checkpoint';


export class RxPipeline<RxDocType> {
    processQueue = PROMISE_RESOLVE_VOID;
    subs: Subscription[] = [];
    stopped: boolean = false;

    toRun = 1;
    checkpointId: string;

    lastSourceDocTime = new BehaviorSubject(-1);
    lastProcessedDocTime = new BehaviorSubject(0);
    somethingChanged = new Subject();


    secretFunctionName = 'tx_fn_' + randomCouchString(10)

    waitBeforeWriteFn = async () => {
        console.log('waitBeforeWriteFn!!!! 1 ' + this.secretFunctionName);
        const stack = new Error().stack;
        console.log(stack);
        if (stack && (
            stack.includes(this.secretFunctionName)
        )) {
            console.log('called in tx!!');
        } else {
            await this.awaitIdle();
        }
        console.log('waitBeforeWriteFn!!!! 2');
    }

    constructor(
        public readonly identifier: string,
        public readonly source: RxCollection<RxDocType>,
        public readonly destination: RxCollection<any>,
        public readonly handler: RxPipelineHandler<RxDocType>,
        public readonly batchSize = 100
    ) {
        this.checkpointId = 'rx-pipeline-' + identifier;
        this.source.onDestroy.push(() => this.destroy());
        this.destination.awaitBeforeReads.add(this.waitBeforeWriteFn);
        this.subs.push(
            this.source.database.eventBulks$.pipe(
                filter(changeEventBulk => changeEventBulk.collectionName === this.source.name)
            ).subscribe((bulk) => {
                this.lastSourceDocTime.next(bulk.events[0].documentData._meta.lwt);
                this.somethingChanged.next({});
            })
        );
        this.subs.push(
            this.destination.database.internalStore
                .changeStream()
                .subscribe(eventBulk => {


                    console.log('## this.destination.database.internalStore EMIOTTED;');
                    console.dir(eventBulk);

                    const events = eventBulk.events;
                    for (let index = 0; index < events.length; index++) {
                        const event = events[index];
                        if (
                            event.documentData.context === RX_PIPELINE_CHECKPOINT_CONTEXT &&
                            event.documentData.key === this.checkpointId
                        ) {
                            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA');
                            this.lastProcessedDocTime.next(event.documentData.data.lastDocTime);
                            this.somethingChanged.next({});
                        }
                    }
                })
        );
    }

    trigger() {
        console.log('TRIGGER');
        /**
         * Do not stack up too many
         * so that fast writes to the source collection
         * do not block anything too long.
         */
        if (this.toRun > 2) {
            return;
        }
        this.toRun = this.toRun + 1;

        this.processQueue = this.processQueue.then(async () => {
            console.log('processQueue 1');
            this.toRun = this.toRun - 1;

            let done = false;
            while (
                !done &&
                !this.stopped &&
                !this.destination.destroyed &&
                !this.source.destroyed
            ) {
                console.log('processQueue loop');
                const checkpointDoc = await getCheckpointDoc(this);
                console.dir({ checkpointDoc, a: 1 })
                const checkpoint = checkpointDoc ? checkpointDoc.data.checkpoint : undefined;
                const docsSinceResult = await getChangedDocumentsSince(
                    this.source.storageInstance,
                    this.batchSize,
                    checkpoint
                );

                console.log('processQueue 2 A');
                console.dir(docsSinceResult);
                let lastTime = checkpointDoc ? checkpointDoc.data.lastDocTime : 0;
                if (docsSinceResult.documents.length > 0) {
                    console.log('processQueue 2 B');
                    const rxDocuments = mapDocumentsDataToCacheDocs(this.source._docCache, docsSinceResult.documents);
                    const _this = this;



                    // const o: any = {};
                    // eval(`
                    //     async function ${this.secretFunctionName}(docs){ const x = await _this.handler(docs); return x; }
                    //     o.${this.secretFunctionName} = ${this.secretFunctionName};
                    // `);
                    // await o[this.secretFunctionName](rxDocuments);

                    console.log('processQueue 2 C');
                    const fnKey = blockFlaggedFunctionKey();
                    this.secretFunctionName = fnKey;
                    try {
                        await FLAGGED_FUNCTIONS[fnKey](() => _this.handler(rxDocuments));
                    } finally {
                        releaseFlaggedFunctionKey(fnKey);
                    }

                    console.log('processQueue 2 D');

                    lastTime = ensureNotFalsy(lastOfArray(docsSinceResult.documents))._meta.lwt;
                    console.log('processQueue 2 E ' + lastTime);
                }
                if (!this.destination.destroyed) {
                    await setCheckpointDoc(this, { checkpoint: docsSinceResult.checkpoint, lastDocTime: lastTime }, checkpointDoc);
                }
                if (docsSinceResult.documents.length < this.batchSize) {
                    done = true;
                }
            }
        });
    }

    async awaitIdle() {
        let done = false;
        while (!done) {
            await this.processQueue;
            console.dir({
                lastSourceDocTime: this.lastSourceDocTime.getValue(),
                lastProcessedDocTime: this.lastProcessedDocTime.getValue()
            });
            if (this.lastProcessedDocTime.getValue() >= this.lastSourceDocTime.getValue()) {
                done = true;
            } else {
                console.log('v1');
                await firstValueFrom(this.somethingChanged);
                console.log('v2');
            }
        }
    }

    async destroy() {
        this.stopped = true;
        this.destination.awaitBeforeReads.delete(this.waitBeforeWriteFn);
        this.subs.forEach(s => s.unsubscribe());
        await this.processQueue;
    }

    /**
     * Remove the pipeline and all metadata which it has stored
     */
    async remove() {
        const insternalStore = this.destination.database.internalStore;
        const checkpointDoc = await getCheckpointDoc(this);
        if (checkpointDoc) {
            const newDoc: RxDocumentData<InternalStoreDocType> = clone(checkpointDoc);
            newDoc._deleted = true;
            const writeResult = await insternalStore.bulkWrite([{
                previous: checkpointDoc,
                document: newDoc,
            }], RX_PIPELINE_CHECKPOINT_CONTEXT);
            if (writeResult.error.length > 0) {
                throw writeResult.error;
            }
        }
        return this.destroy();
    }
}


export async function getCheckpointDoc<RxDocType>(
    pipeline: RxPipeline<RxDocType>
): Promise<RxDocumentData<InternalStoreDocType<CheckpointDocData>> | undefined> {
    const insternalStore = pipeline.destination.database.internalStore;
    const checkpointId = getPrimaryKeyOfInternalDocument(
        pipeline.checkpointId,
        RX_PIPELINE_CHECKPOINT_CONTEXT
    );
    const results = await insternalStore.findDocumentsById([checkpointId], false);
    const result: RxDocumentData<InternalStoreDocType> = results[0];
    if (result) {
        return result;
    } else {
        return undefined;
    }
}

export async function setCheckpointDoc<RxDocType>(
    pipeline: RxPipeline<RxDocType>,
    newCheckpoint: CheckpointDocData,
    previous?: RxDocumentData<InternalStoreDocType>
): Promise<void> {
    const insternalStore = pipeline.destination.database.internalStore;
    const newDoc: RxDocumentData<InternalStoreDocType<CheckpointDocData>> = {
        _attachments: {},
        _deleted: false,
        _meta: {
            lwt: now()
        },
        _rev: createRevision(pipeline.destination.database.token, previous),
        context: RX_PIPELINE_CHECKPOINT_CONTEXT,
        data: newCheckpoint,
        id: getPrimaryKeyOfInternalDocument(
            pipeline.checkpointId,
            RX_PIPELINE_CHECKPOINT_CONTEXT
        ),
        key: pipeline.checkpointId
    };

    console.log('setCheckpointDoc:');
    console.dir({
        previous,
        document: newDoc,
        newCheckpoint
    });
    const writeResult = await insternalStore.bulkWrite([{
        previous,
        document: newDoc,
    }], RX_PIPELINE_CHECKPOINT_CONTEXT);
    if (writeResult.error.length > 0) {
        throw writeResult.error;
    }
}


export async function addPipeline<RxDocType>(
    this: RxCollection<RxDocType>,
    options: RxPipelineOptions<RxDocType>
): Promise<RxPipeline<RxDocType>> {
    const pipeline = new RxPipeline<RxDocType>(
        options.identifier,
        this,
        options.destination,
        options.handler,
        options.batchSize
    );
    console.log('ADD PIPELINE ' + typeof options.waitForLeadership);
    const waitForLeadership = typeof options.waitForLeadership === 'undefined' ? true : options.waitForLeadership;
    const startPromise = waitForLeadership ? this.database.waitForLeadership() : PROMISE_RESOLVE_VOID;
    startPromise.then(() => {
        console.log('START !!');
        pipeline.trigger();
        pipeline.subs.push(
            this.database.eventBulks$.pipe(
                filter(changeEventBulk => changeEventBulk.collectionName === this.name),
                filter(bulk => {
                    if (pipeline.stopped) {
                        return false;
                    }
                    const first = bulk.events[0];
                    return !first.isLocal;
                })
            ).subscribe(() => pipeline.trigger())
        );
    });

    return pipeline;
}
