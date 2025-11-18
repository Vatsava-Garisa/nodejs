
/**
 * Description: Changes the owner and group of a file.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Change owner (requires root/admin privileges)
fs.chown('file.txt', 1000, 1000, (err) => {
    if (err) {
        console.error('Failed to change owner:', err);
        return;
    }
    console.log('Owner changed');
});

// Example 2: Set correct ownership after file creation
async function createWithOwnership(filePath, data, uid, gid) {
    await fsPromises.writeFile(filePath, data);

    try {
        await fsPromises.chown(filePath, uid, gid);
        console.log(`File created with owner ${uid}:${gid}`);
    } catch (err) {
        console.warn('Could not set ownership (may require elevated privileges)');
    }
}