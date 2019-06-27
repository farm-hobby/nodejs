const users = [];

const PATHS = {
    USERS: '/users'
};

exports.set = (router) => {
    router.get(PATHS.USERS, (req, res) => {
        res.render('users', {
            pageTitle: 'Users',
            users: users,
            path: PATHS.USERS
        });
    });

    router.post(PATHS.USERS, (req, res) => {
        users.push(req.body)
        res.redirect(PATHS.USERS);
    });
};
