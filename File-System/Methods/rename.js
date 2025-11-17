
/**
 * Description: Renames a file or moves it to a different location.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Asynchronously
fs.rename('../test.txt', '../renamed.txt', (err) => {
    if (err) {
        console.error('Rename failed:', err);
        return;
    }
    console.log('File renamed');
});

// Example 2: Synchronously
try {
    fs.renameSync('../test.txt', '../renamed.txt');
    console.log('File renamed');
} catch (error) {
    console.error('Rename failed:', error);
}

// Example 3: Promises
try {
    fsPromises.rename('../test.txt', '../renamed.txt');
    console.log('File renamed');
} catch (error) {
    console.error('Rename failed:', error);
}
