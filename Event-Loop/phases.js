
/** 1. Timers Phase
 * Executes callbacks scheduled by setTimeout() and setInterval().
 */

/** 2. Pending Callbacks Phase
 * Executes I/O callbacks deferred from the previous cycle.
 */

/** 3. Idle, Prepare Phase
 * Used internally by Node.js only.
 * You don't interact with this phase directly.
 */

/** 4. Poll Phase
 * Retrieves new I/O events.
 * Executes I/O related callbacks (almost all except timers, setImmediate and close callbacks).
 * Blocks and waits for events if appropriate.
 */

/** 5. Check Phase
 * Executes setImmediate() callbacks.
 * These are executed after the poll phase completes.
 */

/** 6. Close Callbacks Phase
 * Executes close event callbacks. (socket.on('close', () => ...));
 */

/********** NOTE **********/
/** process.nextTick()
 * Executes immediately after the current operation, before the event loop continues.
 * It has high priority than any phase
 */

/**
 * When inside an I/O callback, setImmediate() is guaranteed to run before setTimeout(..., 0)
 */

/**
 * Creating a Promise executes the executor function synchronously.
 * Example:
 * new Promise((res) => {
 *     console.log("inside");
 *     res();
 * }).then(() => console.log("after"));
 * console.log("outside");
 * 
 * Output:
 * inside
 * outside
 * after
 */

/** Microtask Queue
 * Microtasks added while draining the microtask queue are executed in the same microtask checkpoint 
 * (i.e., they are appended, and the loop continues draining until empty).
 * 
 * The macrotask scheduled inside microtask runs later (a macrotask), 
 * while microtask scheduled inside macrotask runs in the microtask checkpoint immediately after that macrotask finishes.
 */

/** Microtasks (high priority) vs Macrotasks (low priority)
 * Microtasks:
 * Language level work items.
 * Also known as Jobs.
 * 
 * Promises (.then, .catch, .finally)
 * MutationObserver
 * queueMicrotask()
 * async/await continuation
 * 
 * Macrotasks:
 * Host level work items.
 * Also known as Taks
 * 
 * setTimeout()
 * setInterval()
 * setImmediate()
 * I/O operations
 * DOM events
 */

/* Ordering Summary
    | Operation                | Queue                      | Priority  |
    | ------------------------ | -------------------------- | --------- |
    | Promise.then             | Microtask                  | ⭐ Highest |
    | async/await continuation | Microtask                  | ⭐ Highest |
    | queueMicrotask           | Microtask                  | ⭐ Highest |
    | MutationObserver         | Microtask                  | ⭐ High    |
    | setTimeout               | Macrotask                  | Medium    |
    | setInterval              | Macrotask                  | Medium    |
    | setImmediate (Node)      | Macrotask                  | Medium    |
    | I/O callbacks            | Macrotask                  | Medium    |
    | DOM events               | Macrotask                  | Medium    |
    | UI rendering             | Happens between macrotasks | Low       |
*/

async function processPayment(orderId, amount) {
    console.log('1. Starting payment processing');

    // Macrotask - scheduled for next timer phase
    setTimeout(() => {
        console.log('5. Cleanup: Removing from processing queue');
    }, 0);

    // Microtask - process.nextTick (highest priority)
    process.nextTick(() => {
        console.log('2. Validating order exists');
    });

    // Microtask - Promise
    Promise.resolve().then(() => {
        console.log('3. Checking payment method');
    });

    // Microtask - another Promise
    await new Promise(resolve => {
        process.nextTick(() => {
            console.log('4. Authorizing payment');
            resolve();
        });
    });

    console.log('6. Payment processing complete');
}

processPayment('ORDER-123', 99.99);
