const path = require('path');

const express = require('../node_modules/express');

const { dirRoot } = require('../helpers/path');

const products = [];

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.render('add-product', { 
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true
    });
});

router.post('/product', (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

module.exports = { 
    router,
    products
};