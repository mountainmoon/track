var uuid = require('./utils.js').uuid;
var extend = require('./utils.js').extend;
var bridge = require('./bridge.js');
var cookie = require('mountainmoon/cookie');
var detect = require('mountainmoon/Detect.js');


var anonymousId = '';
var writeKey = btoa('tPBDNvRk1EFvb2ZyRvGyxZjg2ncv26kX');
var TEN_YEARS = 10 * 365 * 24 * 3600 * 1000;
var ua = detect.parse(navigator.userAgent);
var context = {
    browser: ua.browser.name,
    os: {
        name: ua.os.family,
        version: ua.os.version
    },
    screen: {
        width: screen.width,
        height: screen.height,
        density: window.devicePixelRatio || 1
    }
};

var methods = ['page', 'track', 'identify'];

function init() {
    if (!cookie('uuid')) {
        cookie('uuid', anonymousId = uuid(), {expires: TEN_YEARS});
    }
    
    methods.forEach(function (method) {
        sender[method] = function (data) {
            post(data, 'https://api.segment.io/v1/' + method);
        }
    });

    // listen
    bridge.listen2receive(function (name, data) {
        sender[name](data);
    })
}

function post(data, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', 'Basic ' + writeKey);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // set headers
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                console.log(typeof xhr.response);
            } else {
                console.log(xhr.response);
            }
        }
    };
    extend(data, context);
    xhr.send(data);
}

// exports methods page, track and identify.
var sender = {
    init: init
};

module.exports = sender;