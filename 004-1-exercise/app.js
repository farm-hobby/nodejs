const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('We have a client!');
    next();
});

app.use('/users', (req, res) => {
    res.send([
        {
            name: 'Janice',
            years: 21
        },
        {
            name: 'Mikaela',
            years: 28
        },
        {
            name: 'Josh',
            years: 25
        }
    ]);
});

app.use('/', (req, res) => {
    res.send('<h1>Welcome to my world!</h1>')
});


app.listen(3000);