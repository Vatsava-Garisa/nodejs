
const fs = require('fs/promises');


/* Check file exists or not */
const isFileExists = async (path) => {
    try {
        const fd = await fs.open(path, 'r');
        fd.close();
        return true;
    } catch (error) {
        return false;
    }
}

/* Create a file */
const createFile = async (path) => {
    try {
        const fd = await fs.open(path, 'w');
        fd.close();
        return true;
    } catch (error) {
        return false;
    }
}

/* Delete a file */
const deleteFile = async (path) => {
    try {
        await fs.unlink(path);
        return true;
    } catch (error) {
        return false;
    }
}

/* Copy a file */
const copyFile = async (oldPath, newPath) => {
    try {
        await fs.copyFile(oldPath, newPath);
        return true;
    } catch (error) {
        return false;
    }
}

/* Rename a file */
const renameFile = async (oldPath, newPath) => {
    try {
        await fs.rename(oldPath, newPath);
        return true;
    } catch (error) {
        return false;
    }
}

/* Write to a file */
const writeFile = async (path, content) => {
    try {
        const fd = await fs.open(path, 'a');
        await fd.appendFile(content);
        fd.close();
        return true;
    } catch (error) {
        return false;
    }
}

const init = async () => {
    try {
        console.log('Welcome...');

        const CREATE_FILE = 'create file ';
        const DELETE_FILE = 'delete file ';
        const COPY_FILE = 'copy file ';
        const WRITE_FILE = 'write file';
        const RENAME_FILE = 'rename file';

        /* Create if file already not exists */
        const commandFile = `commands.txt`;
        if (!await isFileExists(commandFile)) {
            await createFile(commandFile);
        }


        const fileWatcher = fs.watch(commandFile);

        for await (const event of fileWatcher) {
            if (event.eventType === 'change') {

                const fd = await fs.open(commandFile, 'r');

                const { size } = await fs.stat(commandFile)

                const buff = Buffer.alloc(size);
                const offset = 0;
                const length = size;
                const position = 0;

                await fd.read(buff, offset, length, position);

                const content = buff.toString();

                if (content.includes(CREATE_FILE)) {
                    const filePath = content.substring(CREATE_FILE.length).trim();

                    if (await isFileExists(filePath)) {
                        console.log(`File already exists: ${filePath}`);
                    } else {
                        await createFile(filePath);
                    }
                } else if (content.includes(DELETE_FILE)) {
                    const filePath = content.substring(DELETE_FILE.length).trim();

                    if (await isFileExists(filePath)) {
                        await deleteFile(filePath);
                    } else {
                        console.log(`File doesn't exists: ${filePath}`);
                    }
                    await deleteFile(filePath);
                } else if (content.includes(COPY_FILE)) {
                    const idx = content.indexOf(' to ');
                    const oldPath = content.substring(COPY_FILE.length, idx).trim();
                    const newPath = content.substring(idx + 4).trim();

                    if (await isFileExists(oldPath)) {
                        await copyFile(oldPath, newPath);
                    } else {
                        console.log(`File doesn't exists: ${oldPath}`);
                    }
                } else if (content.includes(WRITE_FILE)) {
                    const idx = content.indexOf(' with ');
                    const filePath = content.substring(WRITE_FILE.length, idx).trim();
                    const toAdd = content.substring(idx + 6).trim();

                    if (await isFileExists(filePath)) {
                        await writeFile(filePath, toAdd);
                    } else {
                        console.log(`File doesn't exists: ${oldPath}`);
                    }
                } else if (content.includes(RENAME_FILE)) {
                    const idx = content.indexOf(' to ');
                    const oldPath = content.substring(RENAME_FILE.length, idx).trim();
                    const newPath = content.substring(idx + 4).trim();

                    if (await isFileExists(oldPath)) {
                        await renameFile(oldPath, newPath);
                    } else {
                        console.log(`File doesn't exists: ${oldPath}`);
                    }
                } else {
                    console.log(`Invalid command: ${content}`);
                }
            }
        }

    } catch (error) {
        console.error(`Error in Outer Catch:`, error);
    }
}

init();
