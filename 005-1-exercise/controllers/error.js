class errorController {

    constructor() {
        this.handleNotFound = this.handleNotFound.bind(this);
    }

    handleNotFound(req, res) {
        const data = {
            pageTitle: 'Not Found'
        };

        res.status(404).render('404', data);
    }
}

module.exports = new errorController;
