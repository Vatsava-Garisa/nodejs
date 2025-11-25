
/** prependOnceListener(eventName, listener)
 * Prepend One Time Listener
 * Adds a one-time listener to te beginning of the listeners array.
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('data', () => console.log('One'));

emitter.prependOnceListener('data', () => console.log('Second'));

emitter.emit('data');
emitter.emit('data');
