const path = require('path');

const express = require('express');

const { dirRoot } = require('../helpers/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(dirRoot, 'views', 'shop.html'));
});

module.exports = router;