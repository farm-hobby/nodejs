const express       = require('express');
const bodyParser    = require('body-parser');
const nunjucks      = require('nunjucks');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

const rootRoutes    = require('./routes/index');
const usersRoutes   = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));

// Define Routes
app.use(usersRoutes);
app.use(rootRoutes);

app.listen(3000);
