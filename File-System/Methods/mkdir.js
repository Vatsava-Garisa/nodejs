
/**
 * Description: Creates a new directory.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1
fs.mkdir('./test', (err) => {
    if (err) {
        console.error('Failed to create directory:', err);
        return;
    }
    console.log('Directory created');
});

// Example 2: Nested Directories
fs.mkdir('./test/one/two', { recursive: true }, (err) => {
    if (err) {
        console.error('Failed to create directories:', err);
        return;
    }
    console.log('Directories created');
});

// Example 3: Create directory structure for new project
async function initializeProject(projectName) {
    const dirs = [
        `./projects/${projectName}/src`,
        `./projects/${projectName}/tests`,
        `./projects/${projectName}/docs`,
        `./projects/${projectName}/config`
    ];

    for (const dir of dirs) {
        await fsPromises.mkdir(dir, { recursive: true });
    }

    console.log(`Project ${projectName} initialized`);
}
