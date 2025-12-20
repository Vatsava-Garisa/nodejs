
const net = require('node:net');


const socket = net.createConnection({ host: '127.0.0.1', port: 3000 }, () => {
    const buff = Buffer.from('Hello from the other side...\n');

    socket.write(buff);
});
