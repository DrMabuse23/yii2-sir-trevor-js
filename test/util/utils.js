'use strict';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');
var toString = Object.prototype.toString;
var _cwd = process.cwd();
var fs = require('fs');

var _getTestPath = function(sub) {
    var _path = path.resolve(process.cwd(), 'test_tmp');
    if(sub) {
        _path = path.join(_path, sub);
    }
    return _path;
};

var set = function(key, value) {
    switch (key) {
        case 'cwd':
            _cwd = path.resolve(value);
            break;
    }
};

var spawnProcess = function(script, args, cb) {

    var _args = [];
    if(Array.isArray(args)) {
        _args = args;
    } else if (toString.call(args) === '[object String]') {
        _args.push(args);
    }

    var path = require.resolve(script);
    _args.unshift(path);
    // execute command
    var process = spawn('node', _args, function(error, stdout, stderr) {
        console.log(arguments);
        if(error) {
            console.error(error.stack);
            console.error('Error code: '+error.code);
            console.error('Signal received: '+error.signal);
            throw new Error();
        }
    });

    process.stdout.on('data', cb);
    process.stderr.on('data', function (d) {
        console.error(d);
    });

};

var executeCommand = function(script, args, cb) {
    if(typeof args === 'function') {
        cb = args;
        args = '';
    }
   spawnProcess(script, args, cb);
};

var fileExists = function(filePath, cb) {
    fs.exists(path, cb);
};

var createTmpTestDir = function(directory) {
    var _path = _getTestPath(directory);
};


module.exports.set = set;
module.exports.spawnProcess = spawnProcess;
module.exports.executeCommand = executeCommand;
