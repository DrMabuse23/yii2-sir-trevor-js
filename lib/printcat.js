'use strict';

var chalk = require('chalk');
var util = require('util');

var _print = function(color, args) {
    var msg = util.format.apply(null, args);
    console.log(chalk[color].call(this, msg));
};

var _success = function() {
    _print('green', arguments);
};

var _error = function() {
    _print('red', arguments);
};

var _warning = function() {
    _print('yellow', arguments);
};

var _info = function() {
    _print('cyan', arguments);
};

var _log = function() {
    _print('white', arguments);
};

module.exports = {
    success: _success,
    error: _error,
    warning: _warning,
    info: _info,
    log: _log
};
