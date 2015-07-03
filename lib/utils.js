var slice = [].slice;
var extend = function(obj) {
    slice.call(arguments, 1).forEach(function(source) {
        for (var prop in source) {
            obj[prop] = source[prop];
        }
    });
    return obj;
};

// generate v4 uuid
// https://gist.github.com/jed/982883
var uuid = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)};

exports.extend = extend;
exports.uuid = uuid;