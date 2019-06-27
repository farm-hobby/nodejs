const UsersModel = require('../models/users');

class UsersController {

    getUsers (req, res) {
        const data = {
            pageTitle: 'Users',
            path: '/users'
        };

        UsersModel.getUsersFromFile((users) => {
            data.users = users;
            res.render('users', data);
        });
    }

    postUsers (req, res) {
        this.user = new UsersModel(req.body);
        res.redirect('/users');
    }
}

module.exports = new UsersController;
