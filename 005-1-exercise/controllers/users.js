const UserModel = require('../models/user');

class UsersController {

    constructor () {
        this.getUsers = this.getUsers.bind(this);
        this.postUsers = this.postUsers.bind(this);
    }

    getUsers (req, res) {
        const data = {
            pageTitle: 'Users',
            path: '/users'
        };

        UserModel.fetchAll((users) => {
            data.users = users;
            res.render('users', data);
        });
    }

    postUsers (req, res) {
        this.user = new UserModel(req.body.name);
        this.user.save(() => {
            res.redirect('/users');
        });
    }
}

module.exports = new UsersController();
