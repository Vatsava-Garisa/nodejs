
/** Common error codes
 * ENOENT - File/directory doesn't exist
 * EEXIST - File/directory already exists
 * EACCES / EPERM - Permission denied
 * EISDIR - Expected file, got directory
 * ENOTDIR - Expected directory, got file
 * EMFILE - Too many open files
 */

const fs = require('fs');
const fsPromises = require('fs/promises');

async function robustFileOperation(file_path) {
    try {
        const data = await fsPromises.readFile(file_path, 'utf8');
        console.log(data);
    } catch (err) {
        switch (err.code) {
            case 'ENOENT':
                console.log('File not found');
                return null;

            case 'EACCES':
                console.error('Permission denied');
                throw new Error('Cannot access file');

            case 'EISDIR':
                console.error('Path is a directory, not a file');
                throw new Error('Invalid file path');

            default:
                console.error('Unexpected error:', err);
                throw err;
        }
    }
}
