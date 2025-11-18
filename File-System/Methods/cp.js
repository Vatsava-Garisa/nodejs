
/**
 * Description: Copies entire directories recursively.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1
await fsPromises.cp('./source-dir', './dest-dir', { recursive: true });

// Example 2: Clone project template
async function cloneProjectTemplate(templateName, projectName) {
    const templatePath = `./templates/${templateName}`;
    const projectPath = `./projects/${projectName}`;

    await fsPromises.cp(templatePath, projectPath, {
        recursive: true,
        errorOnExist: true
    });

    console.log(`Project ${projectName} created from template`);
}
