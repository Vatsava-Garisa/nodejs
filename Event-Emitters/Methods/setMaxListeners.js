
/** setMaxListeners(n)
 * Change Listener Limit.
 * By default, EventEmitter warns if more than 10 listeners are added for a particular event (potential memory leak).
 * Set to 0 or Infinity for unlimited.
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

for (let i = 0; i < 11; i++) {
    emitter.on('data', () => console.log('Data:', data));
}
// MaxListenersExceededWarning

emitter.setMaxListeners(20); // Max 20

emitter.setMaxListeners(0); // Max Infinity

emitter.setMaxListeners(Infinity); // Max Infinity
