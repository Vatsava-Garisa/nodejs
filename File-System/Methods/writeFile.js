
/**
 * Description: Writes data to a file, replacing the file if it already exists.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


const data = 'Pacific Rim\nAttack on Titan\n';

// Example 1
fs.writeFile('../test.txt', data, (err) => {
    if (err) {
        console.log('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});

// Example 2
async function write_file(file_path, data) {
    try {
        await fsPromises.writeFile(file_path, data);

        console.log('File written successfully');
    } catch (error) {
        console.log('Error writing file:', error);
    }
}
write_file('../test.txt', data);
