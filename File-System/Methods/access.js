
/**
 * Description: Tests user's permissions for the file or directory.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Check if file exists
fs.access('../example.txt', fs.constants.F_OK, (err) => {
    if (err) {
        console.log('File does not exist');
    } else {
        console.log('File Exists');
    }
});

// Example 2: Check read/write permissions
fs.access('../example.txt', fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.log('File not Readable/Writable');
    } else {
        console.log('File Readable/Writable');
    }
});

// Example 3: Promises
try {
    fsPromises.access('../example.txt', fs.constants.R_OK | fs.constants.W_OK);
    console.log('File Readable/Writable');
} catch (error) {
    console.log('File not Readable/Writable');
}
