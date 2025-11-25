
/** listeners(eventName)
 * Returns a copy of the array of listeners for the specified event.
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

const handler1 = () => console.log('handler1');
const handler2 = () => console.log('handler2');

emitter.on('data', handler1);
emitter.on('data', handler2);

const listeners = emitter.listeners('data');

console.log(handler1 === listeners[0]);
