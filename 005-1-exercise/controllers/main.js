class mainController {
    getHome(req, res) {
        const data = {
            pageTitle: 'Home',
            path: '/'
        };

        res.render('home', data);
    }
}

module.exports = new mainController;
