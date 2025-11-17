
/**
 * Description: Deletes a file from the filesystem.
 */

const fs = require('fs');


// Example 1: Asynchronously
fs.unlink('../test.txt', (err) => {
    if (err) {
        console.log('Error deleting file:', err);
        return;
    }
    console.log('File Deleted');
});

// Example 2: Synchronously
try {
    fs.unlinkSync('../test.txt');
    console.log('File Deleted');
} catch (error) {
    console.log('Error deleting file:', error);
}
