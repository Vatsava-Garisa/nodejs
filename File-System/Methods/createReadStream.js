
/**
 * Description: Creates a readable stream for large files, memory efficient.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1
const readStream = fs.createReadStream('../example.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64KB chunks
});

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
    console.log('Finished reading file');
});

readStream.on('error', (err) => {
    console.error('Read stream error:', err);
});

// Example 2: Stream log files to client (Express)
app.get('/logs/:filename', (req, res) => {
    const logPath = `./logs/${req.params.filename}`;

    if (!fs.existsSync(logPath)) {
        return res.status(404).send('Log file not found');
    }

    res.setHeader('Content-Type', 'text/plain');
    const readStream = fs.createReadStream(logPath);
    readStream.pipe(res);
});
