const fs = require('fs');

const users = [];

module.exports = (req, res) => {
    const { url, method } = req;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head><title>My Node App</title></head>
                <body>
                    <h1>Welcome to my Node.js World!</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" />
                        <button type="submit">New User</button>
                    </form>
                </body>
            </html>
        `);
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head><title>My Node App</title></head>
                <body>
                    <h1>User List!</h1>
                    <ul>
                        ${users.map(user => `<li>${user}</li>`).join('')}
                    </ul>
                    <a href="/" title="voltar">Voltar</a>
                </body>
            </html>
        `);
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const data = [];

        req.on('data', (chunk) => {
            data.push(chunk);
        });

        return req.on('end', () => {
            const parsedButton = Buffer.concat(data).toString();
            const username = parsedButton.split('=')[1];

            users.push(username);

            console.log(username);

            res.statusCode = 302;
            res.sedtHeader("Location", "/users");

            return res.end();
        });
    }
};
