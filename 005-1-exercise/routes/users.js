const { getUsers, postUsers } = require('../controllers/users');

exports.set = (router) => {
    router.get('/users', getUsers);
    router.post('/users', postUsers);
};
