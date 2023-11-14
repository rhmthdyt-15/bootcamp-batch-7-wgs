const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;

    let filePath;

    switch (url) {
        case '/home':
            filePath = 'home.html';
            break;
        case '/about':
            filePath = 'about.html';
            break;
        case '/contacts':
            filePath = 'contacts.html';
            break;
        default:
            filePath = '404.html';
            break;
    }

    const fullPath = path.join(__dirname, filePath);

    fs.readFile(fullPath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write('Internal Server Error');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
