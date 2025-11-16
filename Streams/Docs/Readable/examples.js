
/************************* Examples *************************/
const fs = require('fs');

// METHOD 1: Using 'data' event (flowing mode)
const readStream1 = fs.createReadStream('notes.js', {
    encoding: 'utf-8',
    highWaterMark: 20 * 1024 // 20KB chunks (default: 16kb)
});

readStream1.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes`);
    // console.log(chunk);
});

readStream1.on('end', () => {
    console.log('Finished reading');
});

readStream1.on('error', (err) => {
    console.error('Error:', err);
});

// METHOD 2: Using read() method (paused mode)
const readStream2 = fs.createReadStream('notes.js', {
    encoding: 'utf8'
});

readStream2.on('readable', () => {
    let chunk;
    while (null !== (chunk = readStream2.read())) {
        console.log(`Read ${chunk.length} bytes`);
        // console.log(chunk);
    }
});

// METHOD 3: Async iteration (modern approach)
async function readFileAsync() {
    const stream = fs.createReadStream('notes.js', {
        encoding: "utf-8"
    });

    for await (const chunk of stream) {
        console.log(chunk);
    }
}
