
/**
 * Description: Writes data to a file descriptor.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Create file with specific permissions
async function createSecureFile(filePath, data) {
    const fd = await fsPromises.open(filePath, 'w', 0o600); // rw-------

    try {
        await fd.write(data);
        await fd.sync();
        console.log('Secure file created with restricted permissions');
    } finally {
        await fd.close();
    }
}
