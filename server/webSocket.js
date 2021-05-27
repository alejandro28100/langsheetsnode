const { Server } = require("socket.io");


const webSocket = server => {

    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('action', (action) => {
            console.log('New action received: ' + action);
            console.log("Sending to all clients");
            socket.broadcast.emit('action', action);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;

};

module.exports = webSocket;