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

            const users = await getUsersFromRoom(io, roomID)

            console.log(`> Current users in room ${roomID}:`, users);

            //Send the new user to all the already connected users
            socket.to(socket.roomID).emit("user-connected", {
                userID: socket.id,
                username: socket.username,
            });

            //Send all the connected users to the client that just connected
            socket.emit("users", users);

            //Choose a user to send the content to the new user

            //Remove the current user from the users array
            const filteredUsers = users.filter(user => user.userID != socket.id);

            if (filteredUsers.length !== 0) {
                const randomUserIndex = Math.floor(Math.random() * filteredUsers.length);
                const randomUser = filteredUsers[randomUserIndex];

                socket
                    .to(randomUser.userID)
                    .emit('send-updated-content', socket.id);
                console.log(`> Ask ${randomUser.username} to send the updated content to ${socket.username}`);
            }



        })

        socket.on('send-updated-content', (userID, content) => {
            socket.to(userID).emit('action', { type: 'update-content', content });
        });

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