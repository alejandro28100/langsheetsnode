const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();


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

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Serve the files of the built React app folder
app.use(express.static(path.resolve(__dirname, '../build')));


app.use("/api", (req, res) => {
    res.send("Welcome to Langsheets API");
})

// Requests unhandled before will return the react app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});