const express = require('express');

const router = express.Router();

const PATHS = {
    HOME: '/'
}

router.get(PATHS.HOME, (req, res) => {
    res.render('home', { 
        pageTitle: 'Home',
        path: PATHS.HOME 
    });
});

router.use((req, res) => {
    res
        .status(404)
        .render('404', { pageTitle: 'Not Found' });
});

module.exports = router;