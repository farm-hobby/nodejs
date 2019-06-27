const { getHome } = require('../controllers/main');
const { handleNotFound } = require('../controllers/error');

exports.set = (router) => {
    router.get('/', getHome);
    router.use(handleNotFound);
};
