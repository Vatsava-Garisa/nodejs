
/** Event Loop
 * JavaScript is Single-Threaded.
 * -- Only one piece of code can run at a time.
 * 
 * Modern apps need to do:
 * Networking (fetch, AJAX)
 * Timers (setTimeout)
 * File I/O
 * UI events (click, scroll)
 * Microtasks (Promises)
 * Rendering
 * 
 * If JS ran everything inside one thread sequentially, long tasks would freeze the UI.
 * So, browsers and Node.js use an event loop to let JS appear asynchronous while still being single-threaded.
 */

/** Architecture
 * Call Stack
 * Heap
 * Web APIs / Node APIs
 * Task Queue (Macrotask Queue) 
 * Microtask Queue
 * Event Loop
 * 
 *       ┌────────────┐
 *       │ Call Stack │  ← JS executes here
 *       └──────┬─────┘
 *              │
 *         Event Loop
 *              │
 *    ┌─────────┴─────────┐
 *    │                   │
 * Microtask Queue    Macrotask Queue
 * (Promises, etc.)   (setTimeout, etc.)
 * 
 * After every macrotask, the event loop empties the entire microtask queue before running the next macrotask.
 * 
 * 1. Executes code in call stack.
 * When stack is empty:
 * 2. Run all microtasks.
 * 3. Run the next macrotask.
 */

/** Phases
 * The event loop operates in phases, and each phase has a queue of callbacks to execute.
 * 
   ┌───────────────────────────┐
┌─>│         1.Timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │   2.Pending Callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     3.Idle, Prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │         4.Poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │         5.Check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤    6.Close Callbacks      │
   └───────────────────────────┘
 *    
 */
