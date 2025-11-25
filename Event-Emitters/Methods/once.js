
/** once(eventName, listener)
 * Adds a one-time listener that is invoke only the first time the event is emitted, after which it is removed.
 */

/** 
 * Internally, Node does not store your callback directly.
 * It wraps your function inside a special internal once-wrapper function.
 * That wrapper removes itself after firing once.
 * 
 * emitter.once('data', () => console.log('once'));
 * 
 * function wrapper(...args) {
 *     handler(...args);
 *     emitter.removeListener('data', wrapper);
 * }
 * 
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.once('data', (data) => {
    console.log('Data:', data);
});

emitter.emit('data', 'Sweden');
emitter.emit('data', 'Norway');


/********** Example **********/

class DataBase extends EventEmitter {
    connect() {
        setTimeout(() => {
            this.emit('connected');
        }, 1000);
    }
}

const myDB = new DataBase();

myDB.once('connected', () => {
    console.log('Connected to DataBase Successfully, starting app...');
});

myDB.connect();
