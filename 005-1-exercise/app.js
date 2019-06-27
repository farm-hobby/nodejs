const path          = require('path');

const express       = require('express');
const bodyParser    = require('body-parser');
const nunjucks      = require('nunjucks');

const routes        = require('./routes');

const app = express();

// Set Template Engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

// Init server
app.listen(3000);
