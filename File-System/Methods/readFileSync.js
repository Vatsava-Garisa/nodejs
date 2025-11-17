
/**
 * Description: Blocks execution until file is completely read.
 */

const fs = require('fs');

// With Decoding - returns decoded data
try {
    const with_Decoding = fs.readFileSync('../example.txt', 'utf8');
    console.log('with_Decoding:', with_Decoding);
} catch (error) {
    console.log('Error reading file:', error);
}

// Without Decoding - returns buffer data
try {
    const without_Decoding = fs.readFileSync('../example.txt');
    console.log('without_Decoding:', without_Decoding);
} catch (error) {
    console.log('Error reading file:', error);
}
