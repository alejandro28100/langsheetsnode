const express = require("express"),
    path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

//Serve the files of the built React app folder
app.use(express.static(path.resolve(__dirname, '../build')));


// All requests will return the react app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});