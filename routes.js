const fs = require('fs');

const requestHandler = (req, res) => {
    console.log(req.url);
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/HTML');
        res.write("<html><head><title>My Node</title></head><body><form action='/create-user' method='POST'><input type='text' name='userName' /><button type='submit'>Add User</button></form></body></html>");
        res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/HTML');
        res.write('<html><head><title>My Node</title></head><body><h1>Users List::</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li></ul></body></html>');
        res.end();
    }
    if (url === '/create-user' && req.method === 'POST') {
        const requestData = [];
        req.on('data', (chunk) => {
            requestData.push(chunk);
        });
        req.on('end', () => {
            const dataReceived = Buffer.concat(requestData).toString();
            const userName = dataReceived.split('=')[1];
            res.setHeader('Content-Type', 'text/HTML');            
            fs.writeFile('userDetails.txt', userName, err => {
                console.log(err);
                res.setHeader('Location', '/');
                res.statusCode = 302;
                return res.end();
            });            
        });
    }
};

module.exports = requestHandler;