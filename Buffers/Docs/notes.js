
/** Buffer - node:buffer
 * Fixed-size chunks of memory allocated outside the V8 JavaScript heap. 
 * They represent raw binary data and are Node.js's way of handling binary data directly.
 * 
 * JavaScript was originally designed for browsers, where strings were the primary data type. But Node.js deals with:
 * File systems (reading/writing binary files)
 * Network streams (TCP/UDP data)
 * Image/video processing
 * Cryptographic operations
 * 
 * All of these work with binary data, not strings.
 */

/** Key Characteristics
 * Fixed Size: Once created, buffer size cannot change
 * Raw Memory: Direct access to memory, no encoding overhead
 * Global: Buffer class is globally available (no require needed)
 * Array-like: Can access bytes using index notation buffer[0]
 */

/** Buffer vs String vs Array
 * ┌─────────────────┬──────────────┬─────────────────┬──────────────┐
 * | Feature         │ Buffer       │ String          │ Array        │
 * ├─────────────────┼──────────────┼─────────────────┼──────────────┤
 * │ Data Type       │ Binary       │ Text            │ Any          │
 * │ Size            │ Fixed        │ Immutable       │ Dynamic      │
 * │ Memory          │ Outside heap │ Inside heap     │ Inside heap  │
 * │ Use Case        │ I / O, binary│ Text processing │ Collections  │
 * │ Performance     │ Fast         │ Medium          │ Medium       │
 * └─────────────────┴──────────────┴─────────────────┴──────────────┘
 */

/**
 * ┌──────────────────────────┐
 * │       JS Heap (V8)       │
 * │  ┌────────────────────┐  │
 * │  │  Buffer Object     │──┼──► Pointer to native memory
 * │  └────────────────────┘  │
 * └──────────────────────────┘
 *             │
 *             ▼
 * ┌──────────────────────────┐
 * │  Native Heap (C++ layer) │
 * │  └── [binary data bytes] │
 * └──────────────────────────┘
 */

/**
 * 1. Who allocates buffer memory?
 * Ans. Node’s C++ layer (outside V8)
 * 
 * 2. Who owns JS reference?
 * Ans. JS Heap (V8)
 * 
 * 3. Who triggers cleanup?
 * Ans. V8 Garbage Collector
 * 
 * 4. When is memory freed?
 * Ans. When Garbage Collector destroys Buffer wrapper. When all references are gone.
 * 
 * 5. Can Garbage Collector see native memory size?
 * Ans. No, only JS heap
 * 
 * 6. Can cleanup delay cause memory bloat?
 * Ans. Yes
 * 
 * 7. Can you manually force Garbage Collector?
 * Ans. Only with --expose-gc (testing)
 */