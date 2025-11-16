
/** Duplex Streams
 * 
 */

/**
 * Duplex Stream (Independent Read/Write):
 * ════════════════════════════════════════════
 * 
 *        Read Side          Write Side
 *           ▲                  │
 *           │                  ▼
 *     ┌─────┴──────────────────┴─────┐
 *     │      Duplex Stream            │
 *     │                               │
 *     │  [buffer] ←──→ [buffer]       │
 *     └───────────────────────────────┘
 *          TCP Socket Example
 */
