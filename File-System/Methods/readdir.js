
/**
 * Description: Reads the contents of a directory.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1
fs.readdir('../Methods', (err, files) => {
    if (err) {
        console.error('Failed to read directory:', err);
        return;
    }
    console.log('Files:', files);
});

// Example 2: With file types
fs.readdir('./data', { withFileTypes: true }, (err, entries) => {
    if (err) {
        console.error('Failed to read directory:', err);
        return;
    }

    entries.forEach(entry => {
        console.log(entry.name, entry.isDirectory() ? '(dir)' : '(file)');
    });
});

// Example 3: Find files by pattern
async function findFilesByPattern(directory, pattern) {
    const files = await fsPromises.readdir(directory);
    const regex = new RegExp(pattern);

    return files.filter(file => regex.test(file));
};

const logFiles = await findFilesByPattern('./logs', '.*\\.log$');
