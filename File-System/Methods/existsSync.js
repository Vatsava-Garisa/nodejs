
/**
 * Description: Synchronous Existence Check
 */

const fs = require('fs');

// Example 1
if (fs.existsSync('../example.txt')) {
    console.log('File exists');
} else {
    console.log('File does not exist');
}
