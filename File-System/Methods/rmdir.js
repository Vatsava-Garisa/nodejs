
/**
 * Description: Removes a directory (must be empty unless using recursive option).
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1
fs.rmdir('./test', (err) => {
    if (err) {
        console.error('Failed to remove directory:', err);
        return;
    }
    console.log('Directory removed');
});

// Example 2: Remove directory and all contents
fs.rm('./test', { recursive: true, force: true }, (err) => {
    if (err) {
        console.error('Failed to remove directory:', err);
        return;
    }
    console.log('Directories removed');
});
