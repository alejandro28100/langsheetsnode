var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to LangSheets API 📄');
});

router.use('/activities', require('./activities'));


module.exports = router;
