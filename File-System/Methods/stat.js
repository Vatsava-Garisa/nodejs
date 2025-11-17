
/**
 * Description: Returns information about a file.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');

// Example 1
fs.stat('../example.txt', (err, stats) => {
    if (err) {
        console.error('Stat failed:', err);
        return;
    }
    console.log('File size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
});

// Example 2: File size validation before upload.
async function validateFileSize(file_path, max_size_MB = 10) {
    try {
        const stats = await fsPromises.stat(file_path);
        const size_MB = stats.size / (1024 * 1024);

        if (size_MB > max_size_MB) {
            console.log(`File too large: ${size_MB.toFixed(2)}MB (max: ${max_size_MB}MB)`);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Validate failed:', error);
    }
}

// Example 3: Get modified files in the last hour
async function get_recently_modified_files(directory) {
    try {
        const files = await fsPromises.readdir(directory);
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        const recentFiles = [];

        for (const file of files) {
            const filePath = `${directory}/${file}`;
            const stats = await fsPromises.stat(filePath);

            if (stats.mtimeMs > oneHourAgo) {
                recentFiles.push({
                    name: file,
                    size: stats.size,
                    modified: stats.mtime
                });
            }
        }

        return recentFiles;
    } catch (error) {
        console.error('Get recently modified files failed:', error);
    }
}
