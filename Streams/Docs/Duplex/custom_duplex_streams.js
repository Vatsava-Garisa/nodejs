
const fs = require('fs');
const { Duplex } = require('stream');


class MyDuplexStream extends Duplex {
    constructor({ readFileName, writeFileName, readableHighWaterMark, writableHighWaterMark }) {
        super({ readableHighWaterMark, writableHighWaterMark });

        this.readFileName = readFileName;
        this.writeFileName = writeFileName;
        this.readFileDescriptor = null;
        this.writeFileDescriptor = null;
        this.chunks = [];
        this.bytes = 0;
    }

    _construct(callback) {
        fs.open(this.readFileName, 'r', (err, readFileDescriptor) => {
            if (err) {
                return callback(err);
            }
            this.readFileDescriptor = readFileDescriptor;

            fs.open(this.writeFileName, 'w', (err, writeFileDescriptor) => {
                if (err) {
                    return callback(err);
                }
                this.writeFileDescriptor = writeFileDescriptor;

                callback();
            })

        })
    }

    _write(chunk, encoding, callback) {
        this.chunks.push(chunk);
        this.bytes += chunk.length;

        if (this.bytes >= this.writableHighWaterMark) {
            fs.write(this.writeFileDescriptor, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    return callback(err);
                }
                this.chunks = [];
                this.bytes = 0;
                callback(); // Must call the callback()
            })
        } else {
            callback();
        }
    }

    _final(callback) {
        if (this.bytes) {
            fs.write(this.writeFileDescriptor, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    return callback(err);
                }
                console.log(`File written successfully:`, this.fileName);
                callback(); // Must call the callback()
            })
        } else {
            callback();
        }
    }

    _read(size) { // "size" is a hint from the stream engine (usually tied to highWaterMark).
        const buffer = Buffer.alloc(size);
        fs.read(this.readFileDescriptor, buffer, 0, size, null, (err, bytesRead) => { // position = null tells Node to use the internal file offset
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

        if (this.readFileDescriptor) {
            fs.close(this.readFileDescriptor, (err) => {
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

const myStream = new MyDuplexStream({ readFileName: 'notes.js', writeFileName: 'test.txt' });

myStream.on('data', (chunk) => {
    console.log('Chunk:', chunk.toString('utf8'));
});

myStream.write('Sree\n');
myStream.write('Vatsava\n');
myStream.end();

setTimeout(() => {
    if (fs.existsSync('test.txt')) {
        fs.unlinkSync('test.txt');
    }
}, 15 * 1000);

// Example 1: Echo server (reads and writes)
/*
class EchoStream extends Duplex {
    constructor(options) {
        super(options);
        this.buffer = [];
    }

    _write(chunk, encoding, callback) {
        // Store data for reading
        this.buffer.push(chunk);
        callback();
    }

    _read(size) {
        // Push stored data back out
        if (this.buffer.length > 0) {
            this.push(this.buffer.shift());
        }
    }
}

const echo = new EchoStream();
echo.write('Hello');
echo.on('data', (chunk) => {
    console.log('Echo:', chunk.toString()); // "Echo: Hello"
});
*/
