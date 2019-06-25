const path = require('path');

const express       = require('./node_modules/express');
const bodyParser    = require('./node_modules/body-parser');

const { dirRoot } = require('./helpers/path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views')

const adminRoutes = require('./routes/admin').router;
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(dirRoot, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res
        .status(404)
        .render('404', { pageTitle: 'Page Not Found' });
});

app.listen(4000);
