const path = require('path');

const express       = require('express');
const bodyParser    = require('body-parser');

const { dirRoot } = require('./helpers/path');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(dirRoot, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res
        .status(404)
        .sendFile(path.join(dirRoot, 'views', '404.html'));
});

app.listen(4000);
