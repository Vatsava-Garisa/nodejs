
/** EventEmitter
 * EventEmitter is a synchronous pub/sub mechanism.
 * Objects emit named events and registered listeners are synchronously invoked.
 * It is the foundation for many Node APIs (stream, http, socket)
 * 
 * -> Synchronous dispatch: emitter.emit('x') calls listeners immediately, in order.
 * -> Named events: events are identified by strings or symbols.
 * -> Listeners: Functions registered via on, once, prependListener etc.
 * -> Backpressure/Ordering: EventEmitter itself oesn't provide reliable backpressure - we must build it. 
 */

/** error
 * If an 'error' event is emitted and there are no listeners, Node.js will throw the error, print the stack trace, and exit the process.
 * Always handle error events.
 * 
 * Example:
 * emitter.on('error', () => {
 *  console.error('Error:', err);
 * });
 * emitter.on('error', new Error('Something went wrong'));
 * 
 * If a listener throws an error, subsequent listeners are not called an the error propagates.
 * 
 * Example:
 * emitter.on('data', () => {
 *  try {
 *      // risky operation
 *  } catch (err) {
 *      emitter.emit('error', error);
 *  }
 * })
*/

/** Event: newListener
 * Emitted before a listener is added.
 * Useful for logging or conditional setup.
 * NOTE: 'newListener' listener doesn't trigger 'newListener'
 * 
 * Example:
 * emitter.on('newListener', (eventName, listener) => {
 *  console.log(`New listener added for: ${eventName}`);
 * });
 * emitter.on('data', () => {});
 */

/** Event: removeListener
 * Emitted after a listener is removed.
 * 
 * Example:
 * emitter.on('removeListener', (eventName, listener) => {
 *  console.log(`Listener removed from: ${eventName}`);
 * });
 * const handler = () => {};
 * emitter.on('data', handler);
 * emitter.off('data', handler);
 */

/** Emitting Inside Listeners
 * Wrong:
 * emitter.on('data', () => {
 *  console.log('Data');
 *  emitter.emit('data'); // Calls itself forever!
 * });
 * 
 * Correct:
 * emitter.on('data', function handler(data) {
 *  console.log('Processing:', data);
 *  if (data.retry) {
 *      emitter.removeListener('data', handler); // Remove listener first to avoid infinite loop
 *      emitter.emit('data', { retry: false });
 *  }
 * });
 */
