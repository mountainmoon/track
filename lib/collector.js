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
        Object.keys(datas).forEach(function (data, method) {
            data.forEach(function (d) {
                collector[method].apply(collector, d)
            });
            data.length = 0;
        })
    });
}



/**
 * send page data to iframe
 * @param name
 * @param {Object} properties - {version:.}
 */
function page(name, properties) {
    tryDo('page', function () {
        return {
            name: name,
            properties: properties ? extend({
                url: location.href,
                referrer: document.referrer
            }, properties) : '',
            context: context
        }
    }, [].slice.call(arguments))
}

/**
 * send identify data to iframe
 */
function identify() {
    tryDo('identify', function () {return {context: context}}, [])
}

/**
 * send track data to iframe
 * @param event
 * @param properties
 */
function track(event, properties) {
    tryDo('track', function () {
        return {
            event: event,
            properties: properties,
            context: context
        }
    }, [].slice.call(arguments))
}

function tryDo(name, fn, args) {
    if (collector.ready) {
        var data = fn();
        setUserId(data);
        bridge.send(name, data);
    } else {
        datas[name].push(args)
    }
}



var collector = {
    ready: false,
    page: page,
    identify: identify,
    track: track,
    init: init
};

module.exports = collector;