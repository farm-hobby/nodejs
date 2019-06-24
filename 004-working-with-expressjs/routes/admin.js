const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(`
        <form action="/product" method="post">
            <input value="" name="title" />
            <button type="submit">add product</button>
        </form>
    `);
});

router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;