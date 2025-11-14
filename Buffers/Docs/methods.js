
const buffer = Buffer.from('Node.js Buffers');

/** .length 
 * Returns the length of the Buffer.
*/
console.log(buffer.length); // 15


/* .toString() with encoding */
console.log(buffer.toString('utf8')); // 'Node.js Buffers'
console.log(buffer.toString('hex')); // '4e6f64652e6a732042756666657273'
console.log(buffer.toString('base64')); // 'Tm9kZS5qcyBCdWZmZXJz'


/** .slice(start, end) 
 * It does not copy data — it creates a new view (a sub-buffer) that references the same underlying memory as the original.
 * 
 * Node creates a new Buffer object (a new JS object).
 * That new Buffer object’s internal pointer points to the same memory region (ArrayBuffer) as the original.
 * But with different offset and length.
 */
/** Make a real copy
 * const buf = Buffer.from("hello");
 * 
 * Solution-1: const copy = Buffer.from(buf.slice(0, 5));
 * or
 * Solution-2: const copy = Buffer.alloc(5);
 * buf.copy(copy, 0, 0, 5);
 */
const slice = buffer.slice(0, 4);
console.log(slice.toString()); // 'Node'


/** .copy(target, targetStart, sourceStart, sourceEnd) 
 * Copies data from the source buffer into a target buffer. (over a specific byte range - Optional)
 * No shared memory, no references — actual byte duplication.
*/
/** Overlapping regions
 * If you try to copy overlapping regions inside the same buffer, Node ensures safe behavior — it uses a temporary area to prevent data corruption.
 * 
 * const buf = Buffer.from("abcdefgh");
 * buf.copy(buf, 2, 0, 6);
 * console.log(buf.toString()); // 'ababcdef'
 */
/** Manual Concatenation
 * const b1 = Buffer.from("Hello ");
 * const b2 = Buffer.from("World");
 * const result = Buffer.alloc(b1.length + b2.length);
 * b1.copy(result, 0);
 * b2.copy(result, b1.length);
 * console.log(result.toString()); // "Hello World"
 */
const target = Buffer.alloc(4);
buffer.copy(target, 0, 0, 4);
console.log(target.toString()); // 'Node'


/** .concat(list, totalLength) 
 * It joins multiple Buffer objects into one Buffer.
 * It accepts: An array of Buffers + (optional) A total length (useful for performance if you already know the byte size).
*/
/** With Streams
 * let chunks = [];
 * stream.on("data", chunk => {
 *   chunks.push(chunk);
 * });
 * stream.on("end", () => {
 *   const buffer = Buffer.concat(chunks);
 *   console.log(buffer.toString());
 * });
 */
const buf1 = Buffer.from('Hello ');
const buf2 = Buffer.from('World');
const combined = Buffer.concat([buf1, buf2]);
console.log(combined.toString()); // 'Hello World'
