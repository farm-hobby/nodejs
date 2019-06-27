const express = require('express');

const userRoutes = require('./users');
const mainRoutes = require('./main');

const router = express.Router();

userRoutes.set(router);
mainRoutes.set(router);

module.exports = router;
