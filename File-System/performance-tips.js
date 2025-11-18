
const fs = require('fs');
const fsPromises = require('fs/promises');


// 1. Use streams for large files
// Bad: Loads entire file into memory
const data = await fsPromises.readFile('./example.txt');

// Good: Streams data into chunks
const stream = fs.createReadStream('./example.txt');
stream.on('data', chunk => process(chunk));


// 2. Batch Operations
// Bad: Multiple sequential operations
for (const file of files) {
    await fsPromises.unlink(file);
}

// Good: Parallel Operations
await Promise.all(files.map(file => fsPromises.unlink(file)));


// 3. Use promises API for cleaner async code
// Instead of callbacks
fs.readFileSync('./example.txt', (err, data) => {
    if (err) return callback(err);
    fs.writeFile('test.txt', data, callback);
})

// Using async/await
const file_data = await fsPromises.readFile('./example.txt');
await fsPromises.writeFile('test.txt', file_data);


// 4. Close File Descriptors
const fs = await fsPromises.open('./example.txt', 'r');
try {
    // Do Operations
} finally {
    await fd.close();
}
