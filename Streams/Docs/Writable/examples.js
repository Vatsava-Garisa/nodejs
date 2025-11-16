
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
