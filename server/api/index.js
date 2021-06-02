var router = require('express').Router();


//Models
require("../models/Activity");
require("../models/User");

router.get('/', (req, res) => {
    res.send('Welcome to LangSheets API 📄');
});

router.use('/activities', require('./activities'));

router.use("/users", require("./users"));

// Requests unhandled prefixed with /api will return a 404 status
router.get('*', (req, res) => {
    res.status(404).send("Invalid API endpoint");
});

module.exports = router;
