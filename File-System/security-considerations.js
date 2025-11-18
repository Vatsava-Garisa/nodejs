
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');


// 1. Validate file paths to prevent directory traversal
function validateFilePath(userInput, baseDir) {
    const fullPath = path.join(baseDir, userInput);
    const normalizedPath = path.normalize(fullPath);

    if (!normalizedPath.startsWith(baseDir)) {
        throw new Error('Invalid file path - directory traversal detected');
    }

    return normalizedPath;
}
// Usage
try {
    const safePath = validateFilePath(req.params.filename, './uploads');
    const data = await fsPromises.readFile(safePath);
} catch (err) {
    res.status(400).send('Invalid file path');
}


// 2. Set restrictive permissions for sensitive files
await fsPromises.chmod('./secrets/api-key.txt', 0o600); // rw-------


// 3. Valiate file types
const allowedExtensions = ['.jpg', '.png', '.pdf'];
const ext = path.extname(filename).toLowerCase();

if (!allowedExtensions.includes(ext)) {
    throw new Error('File type not allowed');
}


// 4. Limit file sizes
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const stats = await fsPromises.stat(filePath);
if (stats.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
}
