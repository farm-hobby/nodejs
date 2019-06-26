const path = require('path');

const express = require('express');

const { dirRoot } = require('../helpers/path');
const { products } = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop', { 
        products, 
        pageTitle: 'Shop' ,
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true
    });
});

module.exports = router;