
const fs = require('fs');
const { Transform, pipeline } = require('stream');


class MyEncryptStream extends Transform {
    _transform(chunk, encoding, callback) {
        const encrypted_chunk = Buffer.alloc(chunk.length);
        for (let i = 0; i < chunk.length; i++) {
            encrypted_chunk[i] = chunk[i] + 1; // Moifying the buffer
        }
        this.push(encrypted_chunk);
        callback();
    }
}
class MyDecryptStream extends Transform {
    _transform(chunk, encoding, callback) {
        const decrypted_chunk = Buffer.alloc(chunk.length);
        for (let i = 0; i < chunk.length; i++) {
            decrypted_chunk[i] = chunk[i] - 1; // Moifying the buffer
        }
        this.push(decrypted_chunk);
        callback();
    }
}

const myReadStream = fs.createReadStream('notes.js');
const myWriteStream = fs.createWriteStream('text.txt');
const encrypt = new MyEncryptStream();
const decrypt = new MyDecryptStream();

pipeline(myReadStream, encrypt, decrypt, myWriteStream, (err) => {
    if (err) {
        console.error('Pipeline failed.', err);
    } else {
        console.log('Pipeline succeeded.');
    }
});



// Example 1: Uppercase transformer
/*
class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const upperChunk = chunk.toString().toUpperCase();
        this.push(upperChunk);
        callback();
    }
}

process.stdin
    .pipe(new UpperCaseTransform())
    .pipe(process.stdout);
*/

// Example 2: JSON line parser
/*
class JSONLineParser extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true });
        this.buffer = '';
    }

    _transform(chunk, encoding, callback) {
        this.buffer += chunk.toString();
        const lines = this.buffer.split('\n');

        // Keep last incomplete line in buffer
        this.buffer = lines.pop();

        lines.forEach(line => {
            if (line.trim()) {
                try {
                    const obj = JSON.parse(line);
                    this.push(obj);
                } catch (err) {
                    this.emit('error', err);
                }
            }
        });

        callback();
    }

    _flush(callback) {
        // Process remaining buffer
        if (this.buffer.trim()) {
            try {
                const obj = JSON.parse(this.buffer);
                this.push(obj);
            } catch (err) {
                this.emit('error', err);
            }
        }
        callback();
    }
}

fs.createReadStream('data.json')
    .pipe(new JSONLineParser())
    .on('data', (obj) => {
        console.log('Parsed object:', obj);
    });
*/


// File Encryption
/*
const { Transform, pipeline } = require('stream');
const { promisify } = require('util');
const zlib = require('zlib');
const fs = require('fs');
const pipelineAsync = promisify(pipeline);

class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const upperChunk = chunk.toString().toUpperCase();
        this.push(upperChunk);
        callback();
    }
}
async function CompressFile() {
    try {
        await pipelineAsync(
            fs.createReadStream('notes.js'),
            new UpperCaseTransform(),
            zlib.createGzip(),
            fs.createWriteStream('output.txt.gz')
        );
        console.log('Compress Pipeline succeeded');
    } catch (err) {
        console.error('Compress Pipeline failed:', err);
    }
}

async function DecompressFile() {
    try {
        if (!fs.existsSync('output.txt.gz')) {
            console.log(`output.txt.gz doesn't exist`);
            return;
        }
        await pipelineAsync(
            fs.createReadStream('output.txt.gz'),
            zlib.createGunzip(),
            fs.createWriteStream('output.txt')
        );
        console.log('Decompress Pipeline succeeded');
    } catch (err) {
        console.error('Decompress Pipeline failed:', err);
    }
}
*/

