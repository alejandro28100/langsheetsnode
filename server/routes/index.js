var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to LangSheets API 📄');
});

router.use('/activities', require('./activities'));

// Requests unhandled prefixed with /api will return a 404 status
router.get('*', (req, res) => {
    res.status(404).send("Invalid API endpoint");
});

module.exports = router;
