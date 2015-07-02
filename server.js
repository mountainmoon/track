var http = require('http');
http.createServer(function (req, res) {
    console.log(req.url);
    if (req.headers.host.indexOf('community') != -1) {
        //sub domain
        console.log('community cookie:', req.headers);
        console.log()
        res.writeHead(200, {
            'Set-Cookie': 'subdomainValue=community;Domain=community.hcd.com',
            'Content-Type': 'text/plain'
        });
        res.end('community.hcd.com\n');
    } else {
        // top domain
        console.log('hcd cookie:', req.headers);
        console.log()
        res.writeHead(200, {
            //'Set-Cookie': 'domainValue=hcd.com;Domain=hcd.com',
            'Content-Type': 'text/plain'
        });
        res.end('hcd.com\n');
    }
}).listen(1337, '127.0.0.1');

//var http = require('http');
//http.createServer(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello World\n');
//}).listen(1337, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:1337/');