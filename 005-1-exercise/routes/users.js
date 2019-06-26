const express = require('express');

const router = express.Router();

const users = [];

router.get('/users', (req, res) => {
    res.render('users', { users: users });
});

router.post('/users', (req, res) => {
    users.push(req.body)
    res.redirect('/users');
});

module.exports = router;