
/**
 * 1. Avoid blocking the event loop.
 * Never use synchronous operations in production (fs.readFileSync)
 */

/** 2.Break up CPU-intensive tasks */
function heavyComputation(data) {
    const chunks = splitIntoChunks(data, 1000);

    function processChunk(index) {
        if (index >= chunks.length) {
            console.log('Processing complete');
            return;
        }

        // Process chunk
        compute(chunks[index]);

        // Use setImmediate to allow other operations
        setImmediate(() => processChunk(index + 1));
    }

    processChunk(0);
}

/** 3. Use process.nextTick() sparingly
 * Excessive use can starve the event loop
 */

/** 4. Prefer setImmediate() over setTimeout(fn, 0) for deferring execution */

/** 5. Monitor event loop lag in production */
const start = Date.now();
setInterval(() => {
    const lag = Date.now() - start - 1000;
    if (lag > 100) {
        console.warn(`Event loop lag detected: ${lag}ms`);
    }
}, 1000);
