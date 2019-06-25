const path = require('path');

const express = require('../node_modules/express');

const { dirRoot } = require('../helpers/path');
const { products } = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop', { 
        products, 
        pageTitle: 'Shop' ,
        path: '/'
    });
});

module.exports = router;