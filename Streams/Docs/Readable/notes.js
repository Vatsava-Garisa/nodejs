
/** Readable Streams
 * 
 */

/**
 * Readable Stream Modes:
 * ═════════════════════════════════════════════
 * 
 * Mode 1: PAUSED (pull-based, default)
 * ┌──────────────────────────────────────┐
 * │  Stream                              │
 * │  [data][data][data][data]            │
 * │     ▲                                │
 * │     │ read() - consumer pulls        │
 * │  Consumer                            │
 * └──────────────────────────────────────┘
 * 
 * Mode 2: FLOWING (push-based)
 * ┌──────────────────────────────────────┐
 * │  Stream                              │
 * │  [data][data][data][data]            │
 * │     │ 'data' events - stream pushes  │
 * │     ▼                                │
 * │  Consumer                            │
 * └──────────────────────────────────────┘
 */


