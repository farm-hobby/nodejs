const path          = require('path');

const express       = require('express');
const bodyParser    = require('body-parser');
const nunjucks      = require('nunjucks');

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

// Define Routes
const usersRoutes   = require('./routes/users');
const rootRoutes    = require('./routes/index');

app.use(usersRoutes);
app.use(rootRoutes);

// Init server
app.listen(3000);
