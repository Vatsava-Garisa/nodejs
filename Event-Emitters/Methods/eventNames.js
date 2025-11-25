
/** eventNames()
 * Get All Event Names
 * Returns an array of event names that have registered listeners.
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('event1', () => { });

emitter.on('event2', () => { });

emitter.emit('event3');

console.log(emitter.eventNames());