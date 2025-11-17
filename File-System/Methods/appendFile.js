
/**
 * Description: Appends data to a file, creating the file if it doesn't exist.
 */

const fs = require('fs');


const data = 'Pacific Rim\nAttack on Titan\n';

// Example 1: Asynchronous
fs.appendFile('../test.txt', data, (err) => {
    if (err) {
        console.log('Error appending file:', err);
        return;
    }
    console.log(' Data Appended successfully');
})

// Example 2: Synchronous
try {
    fs.appendFileSync('../test.txt', data);
    console.log(' Data Appended successfully');
} catch (error) {
    console.log('Error appending file:', err);
}
