const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    io = require("./webSocket"),
    http = require("http"),
    helmet = require("helmet");

// cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);

io(server);

require("./mongodb");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
// app.use(cors())
//Serve the files of the built React app folder
app.use(express.static(path.resolve(__dirname, '../build')));


app.use("/api", require("./api"));

// Requests unhandled before will return the react app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});