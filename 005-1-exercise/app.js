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

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Define Routes
const rootRoutes    = require('./routes/index');
const usersRoutes   = require('./routes/users');

app.use(usersRoutes);
app.use(rootRoutes);

// Init server
app.listen(3000);
