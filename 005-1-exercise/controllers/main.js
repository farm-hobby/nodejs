class mainController {

    constructor () {
        this.getHome = this.getHome.bind(this);
    }

    getHome(req, res) {
        const data = {
            pageTitle: 'Home',
            path: '/'
        };

        res.render('home', data);
    }
}

module.exports = new mainController;
