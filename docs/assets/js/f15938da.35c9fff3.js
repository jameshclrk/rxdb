"use strict";(self.webpackChunkrxdb=self.webpackChunkrxdb||[]).push([[4630],{2018:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>n,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"articles/localstorage","title":"Using localStorage in Modern Applications - A Comprehensive Guide","description":"This guide explores localStorage in JavaScript web apps, detailing its usage, limitations, and alternatives like IndexedDB and AsyncStorage.","source":"@site/docs/articles/localstorage.md","sourceDirName":"articles","slug":"/articles/localstorage.html","permalink":"/articles/localstorage.html","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Using localStorage in Modern Applications - A Comprehensive Guide","slug":"localstorage.html","description":"This guide explores localStorage in JavaScript web apps, detailing its usage, limitations, and alternatives like IndexedDB and AsyncStorage."},"sidebar":"tutorialSidebar","previous":{"title":"WebSockets vs Server-Sent-Events vs Long-Polling vs WebRTC vs WebTransport","permalink":"/articles/websockets-sse-polling-webrtc-webtransport.html"},"next":{"title":"Real-Time & Offline - RxDB for Mobile Apps","permalink":"/articles/mobile-database.html"}}');var s=t(4848),i=t(8453);const n={title:"Using localStorage in Modern Applications - A Comprehensive Guide",slug:"localstorage.html",description:"This guide explores localStorage in JavaScript web apps, detailing its usage, limitations, and alternatives like IndexedDB and AsyncStorage."},r="Using localStorage in Modern Applications: A Comprehensive Guide",l={},c=[{value:"What is the localStorage API?",id:"what-is-the-localstorage-api",level:2},{value:"Exploring local storage Methods: A Practical Example",id:"exploring-local-storage-methods-a-practical-example",level:2},{value:"Storing Complex Data in JavaScript with JSON Serialization",id:"storing-complex-data-in-javascript-with-json-serialization",level:2},{value:"Understanding the Limitations of local storage",id:"understanding-the-limitations-of-local-storage",level:2},{value:"Reasons to Still Use localStorage",id:"reasons-to-still-use-localstorage",level:2},{value:"Is localStorage Slow?",id:"is-localstorage-slow",level:3},{value:"When Not to Use localStorage",id:"when-not-to-use-localstorage",level:2},{value:"What to use instead of the localStorage API in JavaScript",id:"what-to-use-instead-of-the-localstorage-api-in-javascript",level:2},{value:"localStorage vs IndexedDB",id:"localstorage-vs-indexeddb",level:3},{value:"File System API (OPFS)",id:"file-system-api-opfs",level:3},{value:"localStorage vs Cookies",id:"localstorage-vs-cookies",level:3},{value:"localStorage vs WebSQL",id:"localstorage-vs-websql",level:3},{value:"localStorage vs sessionStorage",id:"localstorage-vs-sessionstorage",level:3},{value:"AsyncStorage for React Native",id:"asyncstorage-for-react-native",level:3},{value:"<code>node-localstorage</code> for Node.js",id:"node-localstorage-for-nodejs",level:3},{value:"localStorage in browser extensions",id:"localstorage-in-browser-extensions",level:2},{value:"localStorage in Deno and Bun",id:"localstorage-in-deno-and-bun",level:2},{value:"Conclusion: Choosing the Right Storage Solution",id:"conclusion-choosing-the-right-storage-solution",level:2},{value:"Follow up",id:"follow-up",level:2}];function d(e){const a={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.header,{children:(0,s.jsx)(a.h1,{id:"using-localstorage-in-modern-applications-a-comprehensive-guide",children:"Using localStorage in Modern Applications: A Comprehensive Guide"})}),"\n",(0,s.jsx)(a.p,{children:"When it comes to client-side storage in web applications, the localStorage API stands out as a simple and widely supported solution. It allows developers to store key-value pairs directly in a user's browser. In this article, we will explore the various aspects of the localStorage API, its advantages, limitations, and alternative storage options available for modern applications."}),"\n",(0,s.jsx)("center",{children:(0,s.jsx)("a",{href:"https://rxdb.info/",children:(0,s.jsx)("img",{src:"../files/logo/rxdb_javascript_database.svg",alt:"JavaScript Database",width:"220"})})}),"\n",(0,s.jsx)(a.h2,{id:"what-is-the-localstorage-api",children:"What is the localStorage API?"}),"\n",(0,s.jsx)(a.p,{children:"The localStorage API is a built-in feature of web browsers that enables web developers to store small amounts of data persistently on a user's device. It operates on a simple key-value basis, allowing developers to save strings, numbers, and other simple data types. This data remains available even after the user closes the browser or navigates away from the page. The API provides a convenient way to maintain state and store user preferences without relying on server-side storage."}),"\n",(0,s.jsx)(a.h2,{id:"exploring-local-storage-methods-a-practical-example",children:"Exploring local storage Methods: A Practical Example"}),"\n",(0,s.jsx)(a.p,{children:"Let's dive into some hands-on code examples to better understand how to leverage the power of localStorage. The API offers several methods for interaction, including setItem, getItem, removeItem, and clear. Consider the following code snippet:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"// Storing data using setItem\nlocalStorage.setItem('username', 'john_doe');\n\n// Retrieving data using getItem\nconst storedUsername = localStorage.getItem('username');\n\n// Removing data using removeItem\nlocalStorage.removeItem('username');\n\n// Clearing all data\nlocalStorage.clear();\n"})}),"\n",(0,s.jsx)(a.h2,{id:"storing-complex-data-in-javascript-with-json-serialization",children:"Storing Complex Data in JavaScript with JSON Serialization"}),"\n",(0,s.jsx)(a.p,{children:"While js localStorage excels at handling simple key-value pairs, it also supports more intricate data storage through JSON serialization. By utilizing JSON.stringify and JSON.parse, you can store and retrieve structured data like objects and arrays. Here's an example of storing a document:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:"const user = {\n  name: 'Alice',\n  age: 30,\n  email: 'alice@example.com'\n};\n\n// Storing a user object\nlocalStorage.setItem('user', JSON.stringify(user));\n\n// Retrieving and parsing the user object\nconst storedUser = JSON.parse(localStorage.getItem('user'));\n"})}),"\n",(0,s.jsx)(a.h2,{id:"understanding-the-limitations-of-local-storage",children:"Understanding the Limitations of local storage"}),"\n",(0,s.jsx)(a.p,{children:"Despite its convenience, localStorage does come with a set of limitations that developers should be aware of:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Non-Async Blocking API"}),": One significant drawback is that js localStorage operates as a non-async blocking API. This means that any operations performed on localStorage can potentially block the main thread, leading to slower application performance and a less responsive user experience."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Limited Data Structure"}),": Unlike more advanced databases, localStorage is limited to a simple key-value store. This restriction makes it unsuitable for storing complex data structures or managing relationships between data elements."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Stringification Overhead"}),": Storing ",(0,s.jsx)(a.a,{href:"/articles/json-based-database.html",children:"JSON data"})," in localStorage requires stringifying the data before storage and parsing it when retrieved. This process introduces performance overhead, potentially slowing down operations by up to 10 times."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Lack of Indexing"}),": localStorage lacks indexing capabilities, making it challenging to perform efficient searches or iterate over data based on specific criteria. This limitation can hinder applications that rely on complex data retrieval."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Tab Blocking"}),": In a multi-tab environment, one tab's localStorage operations can impact the performance of other tabs by monopolizing CPU resources. You can reproduce this behavior by opening ",(0,s.jsx)(a.a,{href:"https://pubkey.github.io/client-side-databases/database-comparison/index.html",children:"this test file"})," in two browser windows and trigger localstorage inserts in one of them. You will observe that the indication spinner will stuck in both windows."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Storage Limit"}),": Browsers typically impose a storage limit of ",(0,s.jsx)(a.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#web_storage",children:"around 5 MiB"})," for each origin's localStorage."]}),"\n"]}),"\n",(0,s.jsx)(a.h2,{id:"reasons-to-still-use-localstorage",children:"Reasons to Still Use localStorage"}),"\n",(0,s.jsx)(a.h3,{id:"is-localstorage-slow",children:"Is localStorage Slow?"}),"\n",(0,s.jsxs)(a.p,{children:["Contrary to concerns about performance, the localStorage API in JavaScript is surprisingly fast when compared to alternative storage solutions like ",(0,s.jsx)(a.a,{href:"/articles/localstorage-indexeddb-cookies-opfs-sqlite-wasm.html",children:"IndexedDB or OPFS"}),". It excels in handling small key-value assignments efficiently. Due to its simplicity and direct integration with browsers, accessing and modifying localStorage data incur minimal overhead. For scenarios where quick and straightforward data storage is required, localStorage remains a viable option. For example RxDB uses localStorage in the ",(0,s.jsx)(a.a,{href:"/rx-storage-localstorage-meta-optimizer.html",children:"localStorage meta optimizer"}),' to manage simple key values pairs while storing the "normal" documents inside of another storage like IndexedDB.']}),"\n",(0,s.jsx)(a.h2,{id:"when-not-to-use-localstorage",children:"When Not to Use localStorage"}),"\n",(0,s.jsx)(a.p,{children:"While localStorage offers convenience, it may not be suitable for every use case. Consider the following situations where alternatives might be more appropriate:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Data Must Be Queryable"}),": If your application relies heavily on querying data based on specific criteria, localStorage might not provide the necessary querying capabilities. Complex data retrieval might lead to inefficient code and slow performance."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Big JSON Documents"}),": Storing large JSON documents in localStorage can consume a significant amount of memory and degrade performance. It's essential to assess the size of the data you intend to store and consider more robust solutions for handling substantial datasets."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Many Read/Write Operations"}),": Excessive read and write operations on localStorage can lead to performance bottlenecks. Other storage solutions might offer better performance and scalability for applications that require frequent data manipulation."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Lack of Persistence"}),": If your application can function without persistent data across sessions, consider using in-memory data structures like ",(0,s.jsx)(a.code,{children:"new Map()"})," or ",(0,s.jsx)(a.code,{children:"new Set()"}),". These options offer speed and efficiency for transient data."]}),"\n"]}),"\n",(0,s.jsx)(a.h2,{id:"what-to-use-instead-of-the-localstorage-api-in-javascript",children:"What to use instead of the localStorage API in JavaScript"}),"\n",(0,s.jsx)(a.h3,{id:"localstorage-vs-indexeddb",children:"localStorage vs IndexedDB"}),"\n",(0,s.jsxs)(a.p,{children:["While ",(0,s.jsx)(a.strong,{children:"localStorage"})," serves as a reliable storage solution for simpler data needs, it's essential to explore alternatives like ",(0,s.jsx)(a.strong,{children:"IndexedDB"})," when dealing with more complex requirements. ",(0,s.jsx)(a.strong,{children:"IndexedDB"})," is designed to store not only key-value pairs but also JSON documents. Unlike localStorage, which usually has a storage limit of around 5-10MB per domain, IndexedDB can handle significantly larger datasets. IndexDB with its support for indexing facilitates efficient querying, making range queries possible. However, it's worth noting that IndexedDB lacks observability, which is a feature unique to localStorage through the ",(0,s.jsx)(a.code,{children:"storage"})," event. Also,\ncomplex queries can pose a challenge with IndexedDB, and while its performance is acceptable, IndexedDB can be ",(0,s.jsx)(a.a,{href:"/slow-indexeddb.html",children:"too slow"})," for some use cases."]}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-js",children:'// localStorage can observe changes with the storage event.\n// This feature is missing in IndexedDB\naddEventListener("storage", (event) => {});\n'})}),"\n",(0,s.jsxs)(a.p,{children:["For those looking to harness the full power of IndexedDB with added capabilities, using wrapper libraries like ",(0,s.jsx)(a.a,{href:"https://rxdb.info/",children:"RxDB"})," is recommended. These libraries augment IndexedDB with features such as complex queries and observability, enhancing its usability for modern applications by providing a real database instead of only a key-value store."]}),"\n",(0,s.jsx)("center",{children:(0,s.jsx)("a",{href:"https://rxdb.info/",children:(0,s.jsx)("img",{src:"../files/logo/rxdb_javascript_database.svg",alt:"RxDB",width:"220"})})}),"\n",(0,s.jsx)(a.p,{children:"In summary when you compare IndexedDB vs localStorage, IndexedDB will win at any case where much data is handled while localStorage has better performance on small key-value datasets."}),"\n",(0,s.jsx)(a.h3,{id:"file-system-api-opfs",children:"File System API (OPFS)"}),"\n",(0,s.jsxs)(a.p,{children:["Another intriguing option is the OPFS (File System API). This API provides direct access to an origin-based, sandboxed filesystem which is highly optimized for performance and offers in-place write access to its content.\nOPFS offers impressive performance benefits. However, working with the OPFS API can be complex, and it's only accessible within a ",(0,s.jsx)(a.strong,{children:"WebWorker"}),". To simplify its usage and extend its capabilities, consider using a wrapper library like ",(0,s.jsx)(a.a,{href:"/rx-storage-opfs.html",children:"RxDB's OPFS RxStorage"}),", which builds a comprehensive database on top of the OPFS API. This abstraction allows you to harness the power of the OPFS API without the intricacies of direct usage."]}),"\n",(0,s.jsx)(a.h3,{id:"localstorage-vs-cookies",children:"localStorage vs Cookies"}),"\n",(0,s.jsxs)(a.p,{children:["Cookies, once a primary method of client-side data storage, have fallen out of favor in modern web development due to their limitations. While they can store data, they are about ",(0,s.jsx)(a.strong,{children:"100 times slower"})," when compared to the localStorage API. Additionally, cookies are included in the HTTP header, which can impact network performance. As a result, cookies are not recommended for data storage purposes in contemporary web applications."]}),"\n",(0,s.jsx)(a.h3,{id:"localstorage-vs-websql",children:"localStorage vs WebSQL"}),"\n",(0,s.jsxs)(a.p,{children:["WebSQL, despite offering a SQL-based interface for client-side data storage, is a ",(0,s.jsx)(a.strong,{children:"deprecated technology"})," and should be avoided. Its API has been phased out of modern browsers, and it lacks the robustness of alternatives like IndexedDB. Moreover, WebSQL tends to be around 10 times slower than IndexedDB, making it a suboptimal choice for applications that demand efficient data manipulation and retrieval."]}),"\n",(0,s.jsx)(a.h3,{id:"localstorage-vs-sessionstorage",children:"localStorage vs sessionStorage"}),"\n",(0,s.jsx)(a.p,{children:"In scenarios where data persistence beyond a session is unnecessary, developers often turn to sessionStorage. This storage mechanism retains data only for the duration of a tab or browser session. It survives page reloads and restores, providing a handy solution for temporary data needs. However, it's important to note that sessionStorage is limited in scope and may not suit all use cases."}),"\n",(0,s.jsx)(a.h3,{id:"asyncstorage-for-react-native",children:"AsyncStorage for React Native"}),"\n",(0,s.jsxs)(a.p,{children:["For React Native developers, the ",(0,s.jsx)(a.a,{href:"https://reactnative.dev/docs/asyncstorage",children:"AsyncStorage API"})," is the go-to solution, mirroring the behavior of localStorage but with asynchronous support. Since not all JavaScript runtimes support localStorage, AsyncStorage offers a seamless alternative for data persistence in React Native applications."]}),"\n",(0,s.jsxs)(a.h3,{id:"node-localstorage-for-nodejs",children:[(0,s.jsx)(a.code,{children:"node-localstorage"})," for Node.js"]}),"\n",(0,s.jsxs)(a.p,{children:["Because native localStorage is absent in the ",(0,s.jsx)(a.strong,{children:"Node.js"})," JavaScript runtime, you will get the error ",(0,s.jsx)(a.code,{children:"ReferenceError: localStorage is not defined"})," in Node.js or node based runtimes like Next.js. The ",(0,s.jsx)(a.a,{href:"https://github.com/lmaccherone/node-localstorage",children:"node-localstorage npm package"})," bridges the gap. This package replicates the browser's localStorage API within the Node.js environment, ensuring consistent and compatible data storage capabilities."]}),"\n",(0,s.jsx)(a.h2,{id:"localstorage-in-browser-extensions",children:"localStorage in browser extensions"}),"\n",(0,s.jsx)(a.p,{children:"While browser extensions for chrome and firefox support the localStorage API, it is not recommended to use it in that context to store extension-related data. The browser will clear the data in many scenarios like when the users clear their browsing history."}),"\n",(0,s.jsxs)(a.p,{children:["Instead the ",(0,s.jsx)(a.a,{href:"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage#properties",children:"Extension Storage API"})," should be used for browser extensions.\nIn contrast to localStorage, the storage API works ",(0,s.jsx)(a.code,{children:"async"})," and all operations return a Promise. Also it provides automatic sync to replicate data between all instances of that browser that the user is logged into. The storage API is even able to storage JSON-ifiable objects instead of plain strings."]}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-ts",children:"// Using the storage API in chrome\n\nawait chrome.storage.local.set({ foobar: {nr: 1} });\n\nconst result = await chrome.storage.local.get('foobar');\nconsole.log(result.foobar); // {nr: 1}\n"})}),"\n",(0,s.jsx)(a.h2,{id:"localstorage-in-deno-and-bun",children:"localStorage in Deno and Bun"}),"\n",(0,s.jsxs)(a.p,{children:["The ",(0,s.jsx)(a.strong,{children:"Deno"})," JavaScript runtime has a working localStorage API so running ",(0,s.jsx)(a.code,{children:"localStorage.setItem()"})," and the other methods, will just work and the locally stored data is persisted across multiple runs."]}),"\n",(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"Bun"})," does not support the localStorage JavaScript API. Trying to use ",(0,s.jsx)(a.code,{children:"localStorage"})," will error with ",(0,s.jsx)(a.code,{children:"ReferenceError: Can't find variable: localStorage"}),". To store data locally in Bun, you could use the ",(0,s.jsx)(a.code,{children:"bun:sqlite"})," module instead or directly use a in-JavaScript database with Bun support like ",(0,s.jsx)(a.a,{href:"https://rxdb.info/",children:"RxDB"}),"."]}),"\n",(0,s.jsx)(a.h2,{id:"conclusion-choosing-the-right-storage-solution",children:"Conclusion: Choosing the Right Storage Solution"}),"\n",(0,s.jsxs)(a.p,{children:["In the world of modern web development, ",(0,s.jsx)(a.strong,{children:"localStorage"})," serves as a valuable tool for lightweight data storage. Its simplicity and speed make it an excellent choice for small key-value assignments. However, as application complexity grows, developers must assess their storage needs carefully. For scenarios that demand advanced querying, complex data structures, or high-volume operations, alternatives like IndexedDB, wrapper libraries with additional features like ",(0,s.jsx)(a.a,{href:"../",children:"RxDB"}),", or platform-specific APIs offer more robust solutions. By understanding the strengths and limitations of various storage options, developers can make informed decisions that pave the way for efficient and scalable applications."]}),"\n",(0,s.jsx)(a.h2,{id:"follow-up",children:"Follow up"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Learn how to store and query data with RxDB in the ",(0,s.jsx)(a.a,{href:"/quickstart.html",children:"RxDB Quickstart"})]}),"\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"/slow-indexeddb.html",children:"Why IndexedDB is slow and how to fix it"})}),"\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"/rx-storage-performance.html",children:"RxStorage performance comparison"})}),"\n"]})]})}function h(e={}){const{wrapper:a}={...(0,i.R)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,a,t)=>{t.d(a,{R:()=>n,x:()=>r});var o=t(6540);const s={},i=o.createContext(s);function n(e){const a=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function r(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),o.createElement(i.Provider,{value:a},e.children)}}}]);