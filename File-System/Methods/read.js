
/**
 * Description: Reads data from a file descriptor into a buffer.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Read file in chunks with progress
async function readWithProgress(filePath, onProgress) {
    const stats = await fsPromises.stat(filePath);
    const fileSize = stats.size;
    const fd = await fsPromises.open(filePath, 'r');

    const chunkSize = 1024 * 1024; // 1MB chunks
    const buffer = Buffer.alloc(chunkSize);
    let bytesRead = 0;
    let position = 0;

    try {
        while (position < fileSize) {
            const { bytesRead: chunkBytes } = await fd.read(
                buffer,
                0,
                chunkSize,
                position
            );

            bytesRead += chunkBytes;
            position += chunkBytes;
            const progress = (bytesRead / fileSize) * 100;
            onProgress(progress, bytesRead, fileSize);

            // Process chunk
            const chunk = buffer.toString('utf8', 0, chunkBytes);
            // Do something with chunk...
        }
    } finally {
        await fd.close();
    }
}
(async () => {
    await readWithProgress('../example.txt', (progress, bytes, total) => {
        console.log(`Progress: ${progress.toFixed(2)}% (${bytes}/${total} bytes)`);
    });
})();
