const express       = require('express');
const bodyParser    = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
    res.send(`
        <form action="/product" method="post">
            <input value="" name="title" />
            <button type="submit">add product</button>
        </form>
    `);
});

app.use('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(4000);
