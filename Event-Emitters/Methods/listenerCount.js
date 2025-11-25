
/** listenerCount(eventName)
 * Count Listeners
 * Returns the number of listeners for a specific event
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('data', () => console.log('Data:', 'One'));
emitter.on('data', () => console.log('Data:', 'Two'));
emitter.on('data', () => console.log('Data:', 'Three'));

console.log('Total Listeners:', emitter.listenerCount('data'));
