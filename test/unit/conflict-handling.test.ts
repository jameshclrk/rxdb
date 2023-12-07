import { waitUntil } from 'async-test-util';

import config from './config.ts';
import * as schemas from '../helper/schemas.ts';
import * as schemaObjects from '../helper/schema-objects.ts';
import {
    createRxDatabase,
    randomCouchString,
    RxCollection
} from '../../plugins/core/index.mjs';

import {
    getRxStorageMemory,
    RxStorageInstanceMemory
} from '../../plugins/storage-memory/index.mjs';

import { HumanDocumentType } from '../helper/schemas.ts';

config.parallel('conflict-handling.test.js', () => {
    describe('RxStorageInterface', () => {
        it('should resolve the emitted conflict of conflictResultionTasks()', async () => {
            if (config.storage.name !== 'memory') {
                return;
            }
            const db = await createRxDatabase({
                name: randomCouchString(10),
                storage: getRxStorageMemory(),
            });
            const cols = await db.addCollections({
                humans: {
                    schema: schemas.human
                }
            });
            const collection: RxCollection<HumanDocumentType> = cols.humans;
            const doc = await collection.insert(schemaObjects.human());
            const docData = doc.toJSON(true);
            const storageInstance: RxStorageInstanceMemory<HumanDocumentType> = collection.storageInstance as any;
            const oldResolveConflictResultionTask = storageInstance.resolveConflictResultionTask.bind(storageInstance);
            const resolvedTasks = new Set<string>();
            storageInstance.resolveConflictResultionTask = function (taskSolution) {
                resolvedTasks.add(taskSolution.id);
                return oldResolveConflictResultionTask(taskSolution);
            };

            const taskId = randomCouchString();
            storageInstance.internals.conflictResultionTasks$.next({
                id: taskId,
                context: '',
                input: {
                    newDocumentState: docData,
                    realMasterState: docData,
                    assumedMasterState: docData
                }
            });
            await waitUntil(() => resolvedTasks.has(taskId));

            db.destroy();
        });
    });
});
