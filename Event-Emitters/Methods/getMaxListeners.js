
/** getMaxListeners()
 * Get Current Listeners Limit.
 * By default 10.
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('data', () => console.log('Data:', 'One'));
emitter.on('data', () => console.log('Data:', 'Two'));
emitter.on('data', () => console.log('Data:', 'Three'));

console.log('Max Listeners:', emitter.getMaxListeners());
