'use strict';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');
var toString = Object.prototype.toString;
var _cwd = process.cwd();
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');

var _getTestPath = function (sub) {
    var _path = path.resolve(process.cwd(), 'test_tmp');
    if (sub) {
        _path = path.join(_path, sub);
    }
    return _path;
};

var removeTmpDir = function () {
    var _path = path.resolve(process.cwd(), '..');
    // asnyc doesn't work?
    rimraf.sync(_path, function (err) {
        if (err) {
            throw new Error();
        }
    });
};

var set = function (key, value, cb) {
    switch (key) {
        case 'chdir':
            _cwd = path.resolve(__dirname, '..', value);
            mkdirp(_cwd, function (err) {
                if (err) {
                    throw new Error();
                }
                try {
                    process.chdir(_cwd);
                    cb(_cwd);
                }
                catch (err) {
                    throw new Error('unable to change dir [probably due to race-conditions]', err);
                }
            });
            break;
    }
};

var spawnProcess = function (script, args, timestmp, oldDir, resolveFirstOutput, cb, chdirTo) {
    var tmpDir = null;
    var returnData = '';
    if (!oldDir && !chdirTo) {
        tmpDir = 'tmp/tmp_test' + timestmp;
    } else if (chdirTo) {
        tmpDir = chdirTo;
    } else {
        tmpDir = oldDir;
    }
    set('chdir', tmpDir, function (dir) {
        var _args = [];
        if (Array.isArray(args)) {
            _args = args;
        } else if (toString.call(args) === '[object String]') {
            _args.push(args);
        }
        var scriptPath = path.resolve(__dirname, script);

        var _path = require.resolve(script);
        _args.unshift(_path);
        // execute command
        var process = spawn('node', _args, function (error, stdout, stderr) {

            if (error) {
                console.error(error.stack);
                console.error('Error code: ' + error.code);
                console.error('Signal received: ' + error.signal);
                throw new Error();
            }
        });

        process.stdout.on('data', function (data) {
            returnData = data;
            if (resolveFirstOutput) {
                cb(data, tmpDir, dir);
            }
        });
        process.stderr.on('data', function (data) {
            returnData = data;
            //cb(data, tmpDir, dir);
        });
        process.stdout.on('end', function (data) {
            cb(returnData, tmpDir, dir);
        });
    });
};

var executeCommand = function (script, args, oldDir, cb, chdirTo, resolveFirstOutput) {
    var timestmp = Date.now();
    if (typeof args === 'function') {
        cb = args;
        args = '';
    }
    spawnProcess(script, args, timestmp, oldDir, resolveFirstOutput, function (output, tmpDir, createdPath) {
        cb(output, tmpDir, createdPath);
    }, chdirTo);
};

var fileExists = function (filePath, cb) {
    var _filePath = path.resolve(filePath);
    fs.exists(_filePath, cb);
};

var createTmpTestDir = function (directory) {
    var _path = _getTestPath(directory);
};


module.exports.set = set;
module.exports.spawnProcess = spawnProcess;
module.exports.executeCommand = executeCommand;
module.exports.removeTmpDir = removeTmpDir;
module.exports.fileExists = fileExists;
