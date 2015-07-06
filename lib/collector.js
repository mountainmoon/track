var extend = require('./utils.js').extend;
var uuid = require('./utils.js').uuid;
var bridge = require('./bridge.js');
var cookie = require('mountainmoon/cookie');

var context = {
    referrer: {
        url: document.referrer
    },
    url: location.href
};

var datas = {
    page: [],
    track: [],
    identify: []
};

function setUserId(data) {
    // memberId
    var userId = cookie('mid');
    if (userId) {
        data.userId = userId;
    }
}

function init() {
    // memberId
    var mid = cookie('mid');
    if (mid) context.mid = mid;

    // virtual session id.
    var vsid = cookie('vsid');
    if (!vsid) {
        var vsid = uuid();
        cookie('vsid', vsid);// todo: 放在根域上?
    }
    context.vsid = vsid;

    bridge.ready2send(function () {
        collector.ready = true;
        Object.keys(datas).forEach(function (method) {
            datas[method].forEach(function (data) {
                collector[method].call(collector, 1, 1, data)
            });
            datas[method].length = 0;
        })
    });
}



/**
 * send page data to iframe
 * @param name
 * @param {Object} properties - {version:.}
 * @param data - a trick data for tryDo's 2nd argument.
 */
function page(name, properties) {
    tryDo('page', arguments[2] || function () {
        return {
            name: name,
            properties: properties ? extend({
                url: location.href,
                referrer: document.referrer
            }, properties) : '',
            context: context
        }
    })
}

/**
 * send identify data to iframe
 */
function identify() {
    tryDo('identify', arguments[2] || function () {return {context: context}})
}

/**
 * send track data to iframe
 * @param event
 * @param properties
 */
function track(event, properties) {
    tryDo('track', arguments[2] || function () {
        return {
            event: event,
            properties: properties,
            context: context
        }
    })
}

function tryDo(name, fn) {
    var data = fn;
    var type = typeof data;

    if (type != 'object') {
        data = fn();
        setUserId(data);

        if (!collector.ready) {
            datas[name].push(data);
            return;
        }
    }

    bridge.send(name, data);
}



var collector = {
    ready: false,
    page: page,
    identify: identify,
    track: track,
    init: init
};

module.exports = collector;