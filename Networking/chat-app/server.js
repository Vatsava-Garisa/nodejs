
// const net = require("net");

// let nextId = 1;
// const connections = new Map(); // id -> socket

// const server = net.createServer((socket) => {
//     const id = nextId++;
//     connections.set(id, socket);

//     console.log(`Client ${id} connected`);

//     // Notify others
//     broadcast(`> User ${id} joined...`, id);

//     // Send id to the new client
//     socket.write(`SOCKET-ID-${id}`);

//     socket.on("data", (chunk) => {
//         broadcast(chunk, id);
//     });

//     // Graceful shutdown from client
//     socket.on("end", () => {
//         console.log(`Client ${id} sent FIN`);
//     });

//     // Mandatory error handler
//     socket.on("error", (err) => {
//         console.log(`Client ${id} error: ${err.message}`);
//     });

//     // Guaranteed cleanup
//     socket.on("close", () => {
//         connections.delete(id);
//         broadcast(`> User ${id} disconnected...`);
//         console.log(`Client ${id} disconnected`);
//     });
// });

// function broadcast(message, exceptId = null) {
//     for (const [id, sock] of connections) {
//         if (id === exceptId) continue;
//         if (!sock.destroyed) {
//             sock.write(message);
//         }
//     }
// }

// server.listen(3000, "127.0.0.1", () => {
//     console.log("Server listening on", server.address());
// });

const net = require("net");

const server = net.createServer();

// an array of client sockets
const clients = [];

server.on("connection", (socket) => {
    console.log("A new connection to the server!");

    const clientId = clients.length + 1;

    // Broadcasting a message to everyone when someone enters the chat room
    clients.map((client) => {
        client.socket.write(`User ${clientId} joined!`);
    });

    socket.write(`id-${clientId}`);

    socket.on("data", (data) => {
        const dataString = data.toString("utf-8");
        const id = dataString.substring(0, dataString.indexOf("-"));
        const message = dataString.substring(dataString.indexOf("-message-") + 9);

        clients.map((client) => {
            client.socket.write(`> User ${id}: ${message}`);
        });
    });

    // Broadcasting a message to everyone when someone leaves the chat room
    socket.on("end", () => {
        clients.map((client) => {
            client.socket.write(`User ${clientId} left!`);
        });
    });

    clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, "127.0.0.1", () => {
    console.log("opened server on", server.address());
});
