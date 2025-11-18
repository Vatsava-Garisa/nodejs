
/**
 * Description: Changes the size of a file, padding with null bytes or truncating.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Truncate to 10 bytes
fs.truncate('file.txt', 10, (err) => {
    if (err) {
        console.error('Truncate failed:', err);
        return;
    }
    console.log('File truncated');
});

// Example 2: Clear log file but keep it
async function clearLogFile(logPath) {
    try {
        await fsPromises.truncate(logPath, 0);
        console.log('Log file cleared');
    } catch (err) {
        console.error('Failed to clear log:', err);
    }
}

// Example 3: Limit file size
async function limitFileSize(filePath, maxBytes) {
    const stats = await fsPromises.stat(filePath);

    if (stats.size > maxBytes) {
        await fsPromises.truncate(filePath, maxBytes);
        console.log(`File truncated from ${stats.size} to ${maxBytes} bytes`);
    }
}
