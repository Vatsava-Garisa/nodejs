
/************************* Examples *************************/

// METHOD 1: Basic writing
/*
const fs = require('fs');
const writeStream = fs.createWriteStream('write1.txt');

writeStream.write('Hello, ');
writeStream.write('World!\n');
writeStream.end(); // Signal no more data

writeStream.on('finish', () => {
    console.log('Writing completed');
    setTimeout(() => {
        if (fs.existsSync("write1.txt")) {
            fs.unlinkSync('write1.txt');
        }
    }, 10 * 1000);
});
*/

// METHOD 2: Copy Files with Backpressure Handling
/*
const fs = require('fs');
const myReadStream = fs.createReadStream('notes.js');
const myWriteStream = fs.createWriteStream('test.txt');

myReadStream.on('data', (chunk) => {
    let ok = myWriteStream.write(chunk);
    if (!ok) {
        myReadStream.pause(); // Handle Backpressure
    }
});

myWriteStream.on('drain', () => {
    myReadStream.resume();
});

myReadStream.on('end', () => {
    console.log('File copied with proper handled backpressure');
    myWriteStream.end();
    setTimeout(() => {
        if (fs.existsSync("test.txt")) {
            fs.unlinkSync('test.txt');
        }
    }, 10 * 1000);
})
*/

// METHOD 3: Handling backpressure
/*
const fs = require('fs');
function writeThousandLines(writer, encoding, callback) {
    let i = 1000;

    function write() {
        let ok = true;

        do {
            i--;
            const data = `Line ${i}\n`;

            if (i === 0) {
                // Last write
                writer.write(data, encoding, callback);
            } else {
                // Keep writing until buffer is full
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);

        if (i > 0) {
            // Buffer full, wait for drain
            writer.once('drain', write);
        }
    }

    write();
}

const myWriteStream = fs.createWriteStream('big-file.txt');
writeThousandLines(myWriteStream, 'utf8', () => {
    console.log('Done writing!');
    setTimeout(() => {
        if (fs.existsSync("big-file.txt")) {
            fs.unlinkSync('big-file.txt');
        }
    }, 10 * 1000);
});
*/

function createBigFile() {
    let i = 0;
    const MAX_BUFFER_SIZE = 16 * 1024;
    let chunks = '';

    const myWriteStream = fs.createWriteStream('./test.txt');

    myWriteStream.on('finish', () => {
        console.log('Write complete');
        console.timeEnd('writeFile');
    });

    myWriteStream.on('drain', () => {
        write_to_file();
    });

    console.time('writeFile');

    function write_to_file() {
        while (i < 1000000) {
            let write_text = ` ${i} `;
            chunks += write_text;
            i++;

            if (chunks.length >= MAX_BUFFER_SIZE) {
                let ok = myWriteStream.write(chunks);
                chunks = '';
                if (!ok) return;
            }
        }

        if (chunks.length > 0) {
            myWriteStream.end(chunks);
        } else {
            myWriteStream.end();
        }
    }

    write_to_file();
}

function copyBigFile() {
    console.time('copy');
    const myReadStream = fs.createReadStream('test.txt', { highWaterMark: 16 * 1024 });
    const myWriteStream = fs.createWriteStream('copy.txt');

    myReadStream.on('data', (chunk) => {
        let ok = myWriteStream.write(chunk);
        if (!ok) {
            myReadStream.pause();
        }
    });

    myReadStream.on('end', () => {
        myWriteStream.end();
    });

    myWriteStream.on('drain', () => {
        myReadStream.resume();
    });

    myWriteStream.on('finish', () => {
        console.log('Copy Completed');
        console.timeEnd('copy');
    });
}

function copyEven() {
    console.time('copyEven');
    let write = '';
    const myReadStream = fs.createReadStream('test.txt');
    const myWriteStream = fs.createWriteStream('copy_even.txt');

    myReadStream.on('data', (chunk) => {
        let data = chunk.toString('utf8').split('  ');

        if (+data[0] !== +data[1] - 1) {
            data[0] = write + data[0];
        }

        if (+data[data.length - 2] !== +data[data.length - 1] - 1) {
            write += data[data.length - 1];
            data.pop();
        }

        for (let num of data) {
            if (+num % 2 === 0) {
                let ok = myWriteStream.write(' ' + num + ' ');
                if (!ok) {
                    myReadStream.pause();
                }
            }
        }
    });

    myReadStream.on('end', () => {
        myWriteStream.end();
    });

    myWriteStream.on('drain', () => {
        myReadStream.resume();
    });

    myWriteStream.on('finish', () => {
        console.log('Copy Completed');
        console.timeEnd('copyEven');
    });
}
