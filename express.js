var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    switch(req.hostname) {
        
    }
});

app.use(express.static('test'));

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
