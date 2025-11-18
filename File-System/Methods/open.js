
/**
 * Description: Opens a file and returns a file descriptor for low-level operations.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Read
fs.open('data.txt', 'r', (err, file_descriptor) => {
    if (err) {
        console.error('Failed to open file:', err);
        return;
    }

    // Use File Descriptor
    const buffer = Buffer.alloc(100);
    fs.read(file_descriptor, buffer, 0, 100, 0, (err, bytesRead, buffer) => {
        if (err) {
            console.error('Read failed:', err);
        } else {
            console.log('Read:', buffer.toString('utf8', 0, bytesRead));
        }

        // Always close file descriptor
        fs.close(file_descriptor, (err) => {
            if (err) console.error('Failed to close file_descriptor:', err);
        });
    });
});

// Example 2: Read specific portion of large file
async function readFileChunk(filePath, start, length) {
    const file_descriptor = await fsPromises.open(filePath, 'r');

    try {
        const buffer = Buffer.alloc(length);
        const { bytesRead } = await file_descriptor.read(buffer, 0, length, start);
        return buffer.toString('utf8', 0, bytesRead);
    } finally {
        await file_descriptor.close();
    }
}
