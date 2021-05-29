const { Server } = require("socket.io");


const webSocket = server => {

    const io = new Server(server);

    io.use(registerUser);

    io.on('connection', (socket) => {
        //Create a record of users to track them as they connect; (Not suitable when scaling up)
        let users = [];
        // console.log(io.of("/").sockets);
        for (let [id, socket] of io.of("/").sockets) {
            //Add the new users
            users.push({
                userID: id,
                username: socket.username,
            });
        }
        //Send all existing users to the client
        socket.emit("users", users);

        // Send the new user to all the existing users except to the one connected
        socket.broadcast.emit("user-connected", {
            userID: socket.id,
            username: socket.username,
        });


        socket.on('action', (action) => {
            // console.log('New action received: ' + action);
            // console.log("Sending to all clients");
            socket.broadcast.emit('action', action);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        })
    });

    return io;

};


function registerUser(socket, next) {
    const username = socket.handshake.auth.username;

    if (!username) {
        return next(new Error('invalid username'));
    }

    socket.username = username;
    next();

}

module.exports = webSocket;