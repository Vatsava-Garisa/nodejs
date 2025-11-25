
/** removeAllListeners([eventName])
 * Removes all listeners, or those of the specified event.
 * off() is an alias for removeListener().
 */

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('event1', () => console.log('One'));

emitter.on('event2', () => console.log('Two'));

emitter.on('event3', () => console.log('Three'));

emitter.emit('event1');

emitter.removeAllListeners('event1'); // Remove listeners of event1

emitter.emit('event1'); // No Listeners

emitter.removeAllListeners(); // Remove listeners of all events

emitter.emit('event2'); // No Listeners

emitter.emit('event3'); // No Listeners


/********** Example **********/

class WebSocketClient extends EventEmitter {
    disconnect() {
        this.removeAllListeners();
    }
}

