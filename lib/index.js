var collector = require('./collector.js');
var sender = require('./sender.js');

/**
 * collector, sender
 * @param name - collector, sender
 * @returns {*} track
 */
module.exports = function (name) {
    if (name == 'collector') {
        return collector;
    } else if (name == 'sender'){
        return sender;
    }
};
