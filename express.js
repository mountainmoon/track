var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();

app.use(cookieParser());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('ok');
});

app.post('/track', handler);
app.post('/page', handler);
app.post('/identify', handler);

function handler(req, res) {
    console.log(req.hostname);
    if (req.hostname == 'tracking.hcd.com') {
        console.log('req.cookies: ', req.cookies);
        console.log('req.url:', req.url);
    }
    req.setEncoding('utf8');
    req.on('data', function (trunck) {
        console.log('data:', trunck);
    });
    res.send('ok');
}

app.use(express.static('test'));

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
