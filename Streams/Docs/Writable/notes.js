
/** Writable Streams
 * 
 */

/**
 * Writable Stream Internal Buffer:
 * ═════════════════════════════════════════
 * 
 * Writing Fast (backpressure):
 * ┌─────────────────────────────────────────┐
 * │ Writer: write() write() write()         │
 * │           ▼       ▼       ▼             │
 * │      ┌──────────────────────┐           │
 * │      │ Internal Buffer      │ FULL!     │
 * │      │ [chunk][chunk][chunk]│           │
 * │      └──────────┬───────────┘           │
 * │                 │ (slow drain)          │
 * │                 ▼                       │
 * │           Destination                   │
 * │      (disk/network/process)             │
 * └─────────────────────────────────────────┘
 * 
 * write() returns false when buffer is full!
 */
