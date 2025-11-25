
/** on(eventName, listener)
 * Adds a listener to the end of the listeners array for the specified event.
 * Multiple listeners can be registered for the same event.
 * on() is an alias for addListener().
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('data', (data) => {
    console.log('First Listener:', data);
});
emitter.addListener('data', (data) => {
    console.log('Second Listener:', data);
});

emitter.emit('data', 'Norway');
