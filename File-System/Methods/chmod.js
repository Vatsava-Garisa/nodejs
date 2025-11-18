
/**
 * Description: Changes the permissions of a file.
 */

const fs = require('fs');
const fsPromises = require('fs/promises');


// Example 1: Numeric mode (octal)
fs.chmod('script.sh', 0o755, (err) => {
    if (err) {
        console.error('Failed to change permissions:', err);
        return;
    }
    console.log('Permissions changed to rwxr-xr-x');
});

// Example 2: Make script executable
async function makeExecutable(scriptPath) {
    try {
        await fsPromises.chmod(scriptPath, 0o755);
        console.log(`${scriptPath} is now executable`);
    } catch (err) {
        console.error('Failed to make script executable:', err);
    }
}

// Example 3: Secure sensitive files
async function secureCredentialFiles(directory) {
    const files = await fsPromises.readdir(directory);

    for (const file of files) {
        if (file.includes('key') || file.includes('secret') || file.includes('credential')) {
            const filePath = `${directory}/${file}`;
            await fsPromises.chmod(filePath, 0o600); // rw------- (owner only)
            console.log(`Secured: ${file}`);
        }
    }
}

/**
 * fs.readdir(directory, { withFileTypes: true })
 * Returns Dirent objects, not just filenames.
 * Each item has:
 * .isFile()
 * .isDirectory()
 * .isSymbolicLink()
 * .name
 */

async function secureCredentialFiles(directory) {
    const entries = await fsPromises.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            // Recursively check inside this directory
            await secureCredentialFiles(fullPath);
        } else {
            // Check if filename contains sensitive keywords
            if (
                entry.name.includes("key") ||
                entry.name.includes("secret") ||
                entry.name.includes("credential")
            ) {
                await fsPromises.chmod(fullPath, 0o600); // rw-------
                console.log(`Secured: ${fullPath}`);
            }
        }
    }
}
