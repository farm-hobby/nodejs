const path = require('path');

const express = require('express');

const { dirRoot } = require('../helpers/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(dirRoot, 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;