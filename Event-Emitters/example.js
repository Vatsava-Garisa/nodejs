
const { EventEmitter } = require('events');


/** Event Namespacing 
 * Use colons or dots to create namespaced events
*/
class User extends EventEmitter {
    login(username) {
        this.emit('user:login', username);
        this.emit('user:activity', { type: 'login', username });
    }

    logout(username) {
        this.emit('user:logout', username);
        this.emit('user:activity', { type: 'logout', username });
    }
}

const user = new User();

user.on('user:login', (username) => {
    console.log(`${username} logged in`);
});

user.on('user:activity', (activity) => {
    console.log(`Activity: ${activity}`);
});

user.login('sree');


/** Async Event Handling with Promises
 * Since emit() is synchronous, we need a pattern for async hanling.
 */
class AsyncEmitter extends EventEmitter {
    async emitAsync(eventName, ...args) {
        const listeners = this.listeners(eventName);

        for (const listener of listeners) {
            await listener(...args);
        }
    }
}

const emitter = new AsyncEmitter();

emitter.on('process', async (data) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Processed:', data);
});

emitter.on('process', async (data) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    console.log('Also processed:', data);
});

(async () => {
    console.log('Before');
    await emitter.emitAsync('process', 'data');
    console.log('After');
})();


/** Event Aggregation Pattern
 * Aggregate multiple events into one.
 */
class OrderProcessor extends EventEmitter {
    constructor() {
        super();
        this.orders = [];

        this.on('order:add', (order) => this.orders.push(order));
        this.on('order:add', (order) => this.checkBatch());
    }

    checkBatch() {
        if (this.orders.length >= 5) {
            this.emit('batch:ready', [...this.orders]);
            this.orders = [];
        }
    }

    addOrder(order) {
        this.emit('order:add', order);
    }
}

const processor = new OrderProcessor();

processor.on('batch:ready', (orders) => {
    console.log('Processing batch:', orders.length, 'orders');
});

processor.addOrder({ id: 1 });
processor.addOrder({ id: 2 });
processor.addOrder({ id: 3 });
processor.addOrder({ id: 4 });
processor.addOrder({ id: 5 });


/** Event Replay Pattern
 * Store and replay events for late subscribers.
 */
class ReplayEmitter extends EventEmitter {
    constructor() {
        super();
        this.history = new Map();
    }

    emit(eventName, ...args) {
        // Store event
        if (!this.history.has(eventName)) {
            this.history.set(eventName, []);
        }
        this.history.get(eventName).push(args);

        // Emit normally
        return super.emit(eventName, ...args);
    }

    onWithReplay(eventName, listener) {
        // Call listener with historical events
        const events = this.history.get(eventName) || [];
        events.forEach(args => listener(...args));

        // Register for future events
        this.on(eventName, listener);
    }
}

const my_emitter = new ReplayEmitter();

my_emitter.emit('message', 'Hello');
my_emitter.emit('message', 'World');

// Late subscriber gets historical events
my_emitter.onWithReplay('message', (msg) => {
    console.log('Received:', msg);
});

my_emitter.emit('message', 'New message');
