
/**
 * Description: Copies a file from source to destination.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1
fs.copyFile('source.txt', 'destination.txt', (err) => {
    if (err) {
        console.error('Copy failed:', err);
        return;
    }
    console.log('File copied successfully');
});

// Example 2: Copy with flags (don't overwrite if exists)
fs.copyFile('source.txt', 'backup.txt', fs.constants.COPYFILE_EXCL, (err) => {
    if (err) {
        if (err.code === 'EEXIST') {
            console.log('Backup already exists');
        }
    } else {
        console.log('File copied successfully');
    }
});

// Example: Create backup before modifying
async function backupBeforeUpdate(filePath) {
    const backupPath = `${filePath}.backup.${Date.now()}`;

    try {
        await fsPromises.copyFile(filePath, backupPath);
        console.log(`Backup created: ${backupPath}`);
        return backupPath;
    } catch (err) {
        console.error('Backup failed:', err);
        throw err;
    }
}
