const { Server } = require("socket.io");

const webSocket = server => {

    const io = new Server(server);

    io.use(registerUser);

    io.on('connection', (socket) => {
        console.log(`> ${socket.username} connected to the server`)

        socket.on('join-room', async (roomID) => {
            console.log(`> Joining ${socket.username} (${socket.id}) to room ${roomID}`);
            //store the roomID in the socket for future actions
            socket.roomID = roomID;
            //subscribe the socket to a given room
            await socket.join(roomID);

            console.log(`> Current users in room ${roomID}:`, await getUsersFromRoom(io, roomID));

            //Send the new user to all the already connected users
            socket.to(socket.roomID).emit("user-connected", {
                userID: socket.id,
                username: socket.username,
            });

            //Send all the connected users to the client that just connected
            socket.emit("users", await getUsersFromRoom(io, socket.roomID));

        })

        socket.on('action', (action) => {
            socket.to(socket.roomID).emit('action', action);
        });

        socket.on("disconnect", async () => {
            console.log(`> ${socket.username} disconnected from room ${socket.roomID}`);
            socket.to(socket.roomID).emit('user-disconnected', { username: socket.username, users: await getUsersFromRoom(io, socket.roomID) });
        })
    });

    return io;

};

async function getUsersFromRoom(io, roomID) {

    // return all Socket instances in the given room of the server
    const sockets = await io.in(roomID).fetchSockets();

    //Returns the username and id from ach individual Socket Instance
    const users = sockets.map(({ username, id }) => ({
        username,
        userID: id
    }));

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