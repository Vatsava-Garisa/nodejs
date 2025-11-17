
/**
 * Description: Writes data to a file, replacing the file if it already exists synchronously.
 */

const fs = require('fs');


const data = 'Pacific Rim\nAttack on Titan\n';

try {
    fs.writeFileSync('../test.txt', data);
    console.log('File written successfully');
} catch (error) {
    console.log('Error writing file:', error);
}

