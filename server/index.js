const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    io = require("./webSocket"),
    http = require("http"),
    cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);

io(server);

/*********************** Mongoose Configuration *******************************/

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        return console.error(err);
    });

mongoose.set('debug', true);

//Models

require("./models/Activity");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
//Serve the files of the built React app folder
app.use(express.static(path.resolve(__dirname, '../build')));


app.use("/api", require("./routes"));

// Requests unhandled before will return the react app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});