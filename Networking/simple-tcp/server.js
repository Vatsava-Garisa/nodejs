
const net = require("node:net");


const server = net.createServer((socket) => {
    socket.on('data', (chunk) => {
        console.log(chunk.toString());
    })
});

server.listen(3000, "127.0.0.1", () => {
    console.log('Server listening on port: 3000');
});
