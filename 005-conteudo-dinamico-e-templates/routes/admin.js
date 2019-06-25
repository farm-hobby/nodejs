const path = require('path');

const express = require('express');

const { dirRoot } = require('../helpers/path');

const products = [];

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.render('add-product', { 
        pageTitle: 'Add Product',
        path: '/admin/add-product'
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