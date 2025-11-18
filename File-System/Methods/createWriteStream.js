
/**
 * Description: Creates a writable stream for efficient writing of large data.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1
const writeStream = fs.createWriteStream('test.txt');

writeStream.write('First line\n');
writeStream.write('Second line\n');
writeStream.end('Last line\n');

writeStream.on('finish', () => {
    console.log('Writing completed');
});

writeStream.on('error', (err) => {
    console.error('Write stream error:', err);
});

// Example 2: Download and save file from API
const https = require('https');

function downloadFile(url, destination) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destination);

        https.get(url, (response) => {
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                resolve(destination);
            });
        }).on('error', (err) => {
            fs.unlink(destination, () => { }); // Delete partial file
            reject(err);
        });
    });
}
