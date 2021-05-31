const { Server } = require("socket.io");


const webSocket = server => {

    const io = new Server(server);

    io.use(registerUser);

    io.on('connection', (socket) => {

        // //Send all existing users to the client
        socket.emit("users", getUsers(io));

        socket.on('action', (action) => {
            socket.broadcast.emit('action', action);
        });

        // Send the new user to all the existing users except to the one connected
        socket.broadcast.emit("user-connected", {
            userID: socket.id,
            username: socket.username,
        });

        socket.on("disconnect", () => {
            console.log(`${socket.username} disconnected`, socket.id,);
            socket.broadcast.emit('user-disconnected', { username: socket.username, users: getUsers(io) });
        })
    });

    return io;

};

function getUsers(io) {
    let users = [];

    for (let [id, socket] of io.of("/").sockets) {
        //Add the new users
        users.push({
            userID: id,
            username: socket.username,
        });
    };

    return users;
}


function registerUser(socket, next) {
    const username = socket.handshake.auth.username;

    if (!username) {
        return next(new Error('invalid username'));
    }

    socket.username = username;
    next();

}

module.exports = webSocket;