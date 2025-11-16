
const fs = require('fs');
const { Readable } = require('stream');


class FileReadStream extends Readable {
    constructor({ highWaterMark = 16 * 1024, fileName }) {
        super({ highWaterMark });

        this.fileName = fileName;
        this.fileDescriptor = null;
    }

    _construct(callback) {
        fs.open(this.fileName, 'r', (err, fileDescriptor) => {
            if (err) {
                return callback(err);
            }
            this.fileDescriptor = fileDescriptor;
            callback(); // Must call the callback()
        });
    }

    _read(size) { // "size" is a hint from the stream engine (usually tied to highWaterMark).
        const buffer = Buffer.alloc(size);
        fs.read(this.fileDescriptor, buffer, 0, size, null, (err, bytesRead) => { // position = null tells Node to use the internal file offset
            if (err) {
                this.destroy(err);
                return;
            }
            if (bytesRead > 0) {
                this.push(buffer.subarray(0, bytesRead)); // Remove the trailing 0's
            } else {
                this.push(null); // Read stream complete
            }
        })
    }

    _destroy(err, callback) {
        if (err) {
            return callback();
        }

        if (this.fileDescriptor) {
            fs.close(this.fileDescriptor, (err) => {
                if (err) {
                    return callback(err);
                }
                callback();
            })
        } else {
            callback();
        }
    }
}
const myStream = new FileReadStream({ fileName: 'notes.js' });
myStream.on('data', (chunk) => {
    console.log('Chunk:', chunk.toString('utf8'));
})

myStream.on('end', () => {
    console.log('Reading stream is over');
})


// Example 1: Simple number generator
/*
class NumberStream extends Readable {
    constructor(max, options) {
        super(options);
        this.max = max;
        this.current = 1;
    }

    _read() {
        if (this.current > this.max) {
            this.push(null); // Signal end of stream
            return;
        }

        const data = `${this.current}\n`;
        this.push(data);
        this.current++;
    }
}
const numbers = new NumberStream(10);
numbers.pipe(process.stdout);
*/

// Example 2: Database query stream
/*
class DatabaseStream extends Readable {
    constructor(query, db) {
        super({ objectMode: true }); // For objects instead of buffers
        this.query = query;
        this.db = db;
        this.offset = 0;
        this.limit = 100;
    }

    async _read() {
        try {
            const results = await this.db.query(
                this.query,
                { offset: this.offset, limit: this.limit }
            );

            if (results.length === 0) {
                this.push(null);
                return;
            }

            results.forEach(row => {
                this.push(row);
            });
            this.offset += results.length;
        } catch (error) {
            this.destroy(error);
        }
    }
}
*/

// Example 3: Simple readable from array
/*
function createArrayStream(array) {
    return Readable.from(array);
}

const stream = createArrayStream(['A', 'B', 'C', 'D', 'E']);
stream.pipe(process.stdout);
*/
