
/********** Reading Binary Files (Images, PDFs, etc.) **********/

const fs = require('fs');

fs.readFile('image-png', (err, buffer) => {
    if (err) {
        console.log('Unable to read the file');
        throw err;
    }

    console.log(`File size: ${buffer.length} bytes`);
    console.log(`First 4 bytes (PNG signature): ${buffer.slice(0, 4).toString('hex')}`);
    // PNG files start with: 89 50 4e 47

    // Modify and save
    // For example, adding a watermark or converting format
    fs.writeFile('output.png', buffer, (err) => {
        if (err) {
            console.log('Unable to write the file');
            throw err;
        }
        console.log('File saved!');
    })
})

/********** Base64 Encoding for APIs **********/

const fs = require('fs');

async function uploadFile(filePath) {
    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString('base64');

    const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filename: 'document.pdf',
            content: base64
        })
    })

    return response.json();
}

/* Server side logic to convert to a file again */
function uploadController(req, res) {
    const { filename, content } = JSON.parse(req.body);
    // Convert base64 -> Buffer
    const fileBuffer = Buffer.from(content, 'base64');
    // Save File
    fs.writeFileSync(filename, fileBuffer);
}


/********** MongoDB Binary Data (GridFS) **********/
const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');

async function uploadToGridFS() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mydb');
    const bucket = new GridFSBucket(db);

    // Uploa file as buffer chunks
    const readStream = fs.createReadStream('large-file.mp4');
    const uploadStream = bucket.openUploadStream('video.mp4');

    readStream.pipe(uploadStream).on('finish', () => {
        console.log('Upload complete');
        client.close();
    })
}

async function downloadFromGriFS(fieldId) {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mydb');
    const bucket = new GridFSBucket(db);

    // Download as buffer chunks
    const downloadStream = bucket.openDownloadStream(fieldId);
    const writeStream = fs.createWriteStream('download.mp4');

    downloadStream.pipe(writeStream).on('finish', () => {
        console.log('Download complete');
        client.close();
    })
}

