
/** off(eventName, listener)
 * Removes a specific listener from the listener array for the specified event.
 * Removes listeners by reference, not by content.
 * Must pass the exact same function reference.
 * Node.js removes only the first matching listener, not all.
 * off() is an alias for removeListener().
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

function handler(data) {
    console.log("Data:", data);
}

emitter.on("data", handler);
emitter.on("data", handler);

emitter.emit("data", "Norway");

emitter.off("data", handler); // remove the same function reference

emitter.emit("data", "Sweden");


/* 
const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('data', (data) => { // Different function!
    console.log('Data:', data);
});

emitter.emit('data', 'Norway');

emitter.off('data', (data) => { // Different function!
    console.log('Data:', data);
});

emitter.emit('data', 'Sweden');

-- NOTE: (data) => console.log(...) Creates a new function object in the memory
*/
