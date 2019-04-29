const fs = require('fs');

const requesthandler = (req, res) => {

    const { url, method } = req;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form method="post" action="/message"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
        res.write('</html>');

        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            res.writeHead(302, {
                Location: '/'
            });

            res.end();
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node App</title></head>');
    res.write('<body><h1>Hello from Node.js</h1></body>');
    res.write('</html>');

    res.end();
}

module.exports = requesthandler;
