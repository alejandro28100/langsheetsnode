const express = require("express"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    io = require("./webSocket"),
    http = require("http"),
    helmet = require("helmet");
const connect = require("./database");

// cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);

io(server);

connect();

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());
// app.use(cors())
//Serve the files of the built React app folder
app.use(express.static(path.resolve(__dirname, '../build')));

app.use("/", require("./routes"));

server.listen(PORT, () => {
    console.log(`> Server listening on ${PORT}`);
});