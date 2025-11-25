
/** emit(eventName, [...args])
 * Synchronously calls each listener registered for the event, in the order they were registered.
 * Returns true if the event had listeners, false otherwise.
 * Synchronous
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('sum', (a, b) => {
    console.log('Sum:', a + b);
});

const hasListeners = emitter.emit('sum', 5, 10);
console.log('hasListeners:', hasListeners);

/* Synchronous
const emitter = new EventEmitter();

emitter.on('test', () => {
    console.log('2. Inside listener');    
})

console.log('1. Before emit');
emitter.emit('test');
console.log('3. Ater emit');
*/
