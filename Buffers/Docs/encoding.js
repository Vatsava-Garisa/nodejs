
/** Encodings
 * Tells Buffer how to interpret bytes as characters (or vice-versa).
 * A Buffer itself is pure binary data - just bytes - so encoding defines the mapping between bytes ↔ characters.
 * Same text → different encodings → different bytes.
 * 
 * If you change encoding, you change:
 * The number of bytes
 * The meaning of each byte
 * The final binary pattern
 * 
 * If you encode with one encoding and decode with another, you will get corrupted, unreadable, or incorrect text — because the bytes will be interpreted using the wrong rules.
 */

/**
 * UTF-8: Uses 1 byte for ASCII chars.
 * "A"  →  0x41  →  01000001
 * 
 * UTF-16LE: Uses 2 bytes per character.
 * "A"  →  0x41 0x00  →  01000001 00000000
 * 
 * ASCII: Uses 1 byte, same as UTF-8 for basic characters.
 * "A" → 0x41 → 01000001
 * 
 * Base64: It isn't encoding - it's binary to text
 * "A" → 0x41 → "QQ=="
 */

/**
 * Encoding = How characters become bytes
 * Decoding = How bytes become characters
 * 
 * If the two don't match:
 * The bytes are decoded incorrectly.
 * Characters become garbage.
 * Or text gets completely broken.
 */

/** File Encoding
 * You only use encoding for:
    * String -> Buffer
    * Buffer -> String (Only when you know it's text)
 * 
 * You do not use encoing for:
    * Reading/writing binary files
    * Copying bytes
    * Slicing/appening raw data
 * 
 * Files are stored in bytes, not text.
 * If the file contains text, decode with the correct encoding (usually UTF-8).
 * If the file is binary, do not decode into a string - Any encoding will corrupt it.
 * Only strings require encoding.
 */

const text = 'Hello World';

/* Common encodings */
console.log(Buffer.from(text, 'utf8'));
console.log(Buffer.from(text, 'ascii'));
console.log(Buffer.from(text, 'base64'));
console.log(Buffer.from(text, 'hex'));
console.log(Buffer.from(text, 'latin1'));
console.log(Buffer.from(text, 'binary')); // alias for latin1

/* Check encoding support */
console.log(Buffer.isEncoding('utf8')); // true
console.log(Buffer.isEncoding('utf-8')); // true
console.log(Buffer.isEncoding('invalid')); // false


/** Numbers -> Buffers
 * Numbers can be represented as bytes, but require special methos because they are not text.
 * Numbers must be converted to raw bytes using Buffer's write methods.
 * 
 * 32-bit integer
 * const buf = Buffer.alloc(4);
 * buf.writeInt32BE(12345);
 * console.log(buf);
 * 
 * Single byte (0-255)
 * const buf = Buffer.from([255]);
 * console.log(buf);
 * 
 * Float Numbers
 * const buf = Buffer.alloc(8);
 * buf.writeDoubleLE(3.14);
 * console.log(buf);
 */

/** Booleans -> Buffers
 * Booleans have no natural byte encoding.
 * Typical conventions: true -> 1 and false -> 0.
 * 
 * const buf = Buffer.from([true ? 1 : 0]);
 * console.log(buf); // <01>
 * 
 * const buf = Buffer.from([+true]);  // +true → 1
 * console.log(buf); // <01>
 */

/** Objects -> Buffer
 * Objects do not have a binary format automatically.
 * You must convert them to a string or binary form first.
 * 
 * Most common wat => JSON string -> Buffer
 * const obj = {name: "Sree"};
 * const buf = Buffer.from(JSON.stringify(obj), "utf8");
 * console.log(buf);
 * 
 * NOTE: This stores JSON text, NOT the object itself.
 */
