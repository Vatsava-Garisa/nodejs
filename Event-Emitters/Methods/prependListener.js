
/** prependListener(eventName, listener)
 * Add Listener to Beginning
 * Adds a listener to te beginning of the listeners array (instead of the end).
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('data', () => console.log('One'));

emitter.prependListener('data', () => console.log('Second'));

emitter.emit('data');


/********** Example **********/

class TaskQueue extends EventEmitter {
    addHighPriorityHanler(handler) {
        this.prependListener('data', handler);
    }

    addNormalHandler(handler) {
        this.on('data', handler);
    }
}
