var win;
var TRACK_URL = '';

/**
 * for host page to send data
 * @param callback - use it to send the data cached before iframe is loaded.
 */
function ready2send(callback) {
    if (win) throw Error('already initialized!');

    var iframe = document.createElement('iframe');
    iframe.src= TRACK_URL;
    iframe.onload = function () {
        win = iframe.contentWindow;
        callback();
    }
}

/**
 * for iframe page to receive data
 * @param callback
 */
function listen2receive(callback) {
    window.addEventListener('message', function(event) {
        var data = event.data.data;
        var name = event.data.name;

        callback(name, data);
    });
}

/**
 * for host page to send data
 * @param name
 * @param data
 */
function send(name, data) {
    if (!win) throw Error('not ready!');
    win.postMessage({
        name: name,
        data: data
    })
}

var bridge = {
    ready2send: ready2send,
    listen2receive: listen2receive,
    send: send
};

module.exports = bridge;
