
/** rawListeners(eventName)
 * Get Listeners with Wrappers
 * Returns a copy of the array of listeners, including wrappers (like those created by once())
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.once('data', () => console.log('once'));

emitter.on('data', () => console.log('on'));

const raw_listeners = emitter.rawListeners('test');
const listeners = emitter.listeners('data');
