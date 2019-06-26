const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.use((req, res) => {
    res
        .status(404)
        .render('404');
});

module.exports = router;