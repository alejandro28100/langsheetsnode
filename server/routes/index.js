let router = require('express').Router();
const path = require("path");

router.use("/api", require("./api"));

router.get("*", (req, res) => {
    console.log("> Serving react app")
    res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
});



module.exports = router;