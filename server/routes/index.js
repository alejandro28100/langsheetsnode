var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to LangSheets API 📄');
});

router.use('/activities', require('./activities'));

// Requests unhandled before will return the react app
router.get('*', (req, res) => {
    res.status(404).send("Invalid API endpoint");
});

module.exports = router;
