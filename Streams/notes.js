
/** Streams
 * Streams are collections of data that might not be available all at once and don't have to fit in the memory.
 * They allow us to process data piece by piece (chunks) instead of loading everything into memory at once.
 * NOTE: objectMode: true - When handling with objects instead of Strings, Buffers.
 * 
 * WITHOUT STREAMS (Loading entire file):
 * ┌─────────────────────────────────────────┐
 * │  RAM: 8GB                               │
 * │  ┌───────────────────────────────────┐  │
 * │  │  Loading 10GB video file...       │  │
 * │  │  ❌ OUT OF MEMORY ERROR           │  │
 * │  └───────────────────────────────────┘  │
 * └─────────────────────────────────────────┘
 * 
 * WITH STREAMS (Processing chunks):
 * ┌─────────────────────────────────────────┐
 * │  RAM: 8GB                               │
 * │  ┌────────────┐                         │
 * │  │ Chunk 64KB │ → Process → Output      │
 * │  └────────────┘                         │
 * │  ✅ Memory stays low, any file size!    │
 * └─────────────────────────────────────────┘
 */

/** Types
 * Readable: Source of data (read from)
 * Ex: fs.createReadStream, http.IncomingMessage
 * 
 * Writable: Destination for data (write to)
 * Ex: fs.createReaStream, http.ServerResponse
 * 
 * Duplex: Both readable and writable
 * Ex: net.Socket, TCP sockets
 * 
 * Transform: Duplex that modifies data
 * Ex: zlib.createGzip, crypto streams
 */

