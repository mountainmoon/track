var win;
var TRACK_URL = '';

function init(callback) {
    if (win) throw Error('already initialized!');

    var iframe = document.createElement('iframe');
    iframe.src= TRACK_URL;
    iframe.onload(function () {
        win = iframe.contentWindow;
        callback();
    })
}

function send(name, data) {
    if (!win) throw Error('not ready!');
    win.postMessage({
        name: name,
        data: data
    })
}

var bridge = {
    init: init,
    send: send
};

module.exports = bridge;
