
const fs = require('fs');
const { Writable } = require('stream');


class FileWriteStream extends Writable {
    constructor({ highWaterMark = 16 * 1024, fileName }) {
        super({ highWaterMark });

        this.fileName = fileName;
        this.fileDescriptor = null;
        this.chunks = [];
        this.bytes = 0;
    }

    _construct(callback) {
        fs.open(this.fileName, 'w', (err, fileDescriptor) => {
            if (err) {
                return callback(err);
            }
            this.fileDescriptor = fileDescriptor;
            callback(); // Must call the callback()
        });
    }

    _write(chunk, encoding, callback) {
        this.chunks.push(chunk);
        this.bytes += chunk.length;

        if (this.bytes >= this.writableHighWaterMark) {
            fs.write(this.fileDescriptor, Buffer.concat(this.chunks), (err) => {
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
            fs.write(this.fileDescriptor, Buffer.concat(this.chunks), (err) => {
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

const myStream = new FileWriteStream({ fileName: 'test.txt' });
myStream.write('Sree\n');
myStream.write('Vatsava\n');
myStream.end();
setTimeout(() => {
    if (fs.existsSync('test.txt')) {
        fs.unlinkSync('test.txt');
    }
}, 15 * 1000);

// Example 1: Console writer with timestamp
/*
class TimestampWriter extends Writable {
    constructor() {
        super();
    }
    _write(chunk, encoding, callback) {
        const timestamp = new Date().toISOString();
        const data = `[${timestamp}] ${chunk.toString()}`;

        process.stdout.write(data);
        callback(); // Signal completion
    }
}
const logger = new TimestampWriter();
logger.write('Hello\n');
logger.write('World\n');
*/

// Example 2: Usage with MongoDB
/*
const { MongoClient } = require('mongodb');

class DatabaseBatchWriter extends Writable {
    constructor(db, options) {
        super({ objectMode: true, ...options });
        this.db = db;
        this.batch = [];
        this.batchSize = 100;
    }

    async _write(record, encoding, callback) {
        this.batch.push(record);

        if (this.batch.length >= this.batchSize) {
            await this.flush();
        }

        callback();
    }

    async flush() {
        if (this.batch.length === 0) return;

        try {
            await this.db.insertMany(this.batch);
            console.log(`Inserted ${this.batch.length} records`);
            this.batch = [];
        } catch (err) {
            this.destroy(err);
        }
    }

    async _final(callback) {
        // Called when stream ends
        await this.flush();
        callback();
    }
}

async function writeRecords() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mydb');
    const collection = db.collection('users');

    const writer = new DatabaseBatchWriter(collection);

    writer.write({ name: 'Alice', age: 30 });
    writer.write({ name: 'Bob', age: 25 });
    writer.end();

    writer.on('finish', () => {
        console.log('All records written');
        client.close();
    });
}
*/

// Example 3: CSV writer
/*
class CSVWriter extends Writable {
    constructor(filename, hearders) {
        super({ objectMode: true });
        this.headers = hearders;
        this.fileStream = fs.createWriterStream(filename);
        this.firstWrite = true;
    }

    _write(record, encoding, callback) {
        if (this.firstWrite) {
            this.fileStream.write(this.headers.join(',') + '\n');
            this.firstWrite = false;
        }

        const values = this.headers.map(h => record[h] || '');
        this.fileStream.write(values.join(',') + '\n', callback);
    }

    _final(callback) {
        this.fileStream.end(callback);
    }
}

const csvWriter = new CSVWriter('users.csv', ['id', 'name', 'email']);
csvWriter.write({ id: 1, name: 'Alice', email: 'alice@example.com' });
csvWriter.write({ id: 2, name: 'Bob', email: 'bob@example.com' });
csvWriter.end();
*/
