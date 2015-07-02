var uuid = require('./utils.js').uuid;
var cookie = require('mountainmoon/cookie');

var anonymousId = '';
var TEN_YEARS = 10 * 365 * 24 * 3600 * 1000;

function init() {
    window.addEventListener('message', function (event) {
        var data = event.data.data;
        var name = event.data.name;

        // call the method

    })

    if (!cookie('uuid')) {
        cookie('uuid', anonymousId = uuid(), {expires: TEN_YEARS}) ;

    }
}



