let router = require('express').Router();

router.use("/api", require("./api"));

router.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});


module.exports = router;