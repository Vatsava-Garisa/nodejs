
/**
 * Description: Reads the entire contents of a file asynchronously.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: With Decoding - returns decoded data
fs.readFile('../example.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('Data:', data);
});

// Example 2: Without Decoding - returns buffer data
fs.readFile('../example.txt', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('Buffer:', data);
});

// Example 3: As Promises
async function read_file(file_path) {
    try {
        let data = await fsPromises.readFile(file_path, 'utf8');
        console.log('Promise Data:', data);
    } catch (error) {
        console.log('Error reading file:', error);
    }
}
