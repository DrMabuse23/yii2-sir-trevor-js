'use strict';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');
var toString = Object.prototype.toString;
var _cwd = process.cwd();
var fs = require('fs');
var rimraf = require('rimraf');

var _getTestPath = function(sub) {
    var _path = path.resolve(process.cwd(), 'test_tmp');
    if(sub) {
        _path = path.join(_path, sub);
    }
    return _path;
};

var removeTmpDir = function(dir) {
    if(!dir) {
        return;
    }
    var _path = path.normalize(dir);
    console.error(process.cwd());
    rimraf(process.cwd(), function(err) {
        if(err) {
            throw new Error();
        }
    });
};

var set = function(key, value, cb) {
    switch (key) {
        case 'chdir':
            _cwd = path.resolve(__dirname, '..', value);
            fs.mkdir(_cwd, function(err) {
                if(err) {
                    throw new Error();
                }
                try {
                  process.chdir(_cwd);
                  console.error('New directory: ' + process.cwd());
                  cb();
                }
                catch (err) {
                  console.error('chdir: ' + err);
                }
                console.error(_cwd);
            });
            break;
    }
};

var spawnProcess = function(script, args, cb) {
    var timestmp = Date.now();
    var tmpDir = 'tmp_test' + timestmp;
    set('chdir', tmpDir, function() {
        var _args = [];
        if(Array.isArray(args)) {
            _args = args;
        } else if (toString.call(args) === '[object String]') {
            _args.push(args);
        }
        var scriptPath = path.resolve(__dirname, script);
        console.error(scriptPath);

        var _path = require.resolve(script);
        _args.unshift(_path);
        // execute command
        var process = spawn('node', _args, function(error, stdout, stderr) {
            if(error) {
                console.error(error.stack);
                console.error('Error code: '+error.code);
                console.error('Signal received: '+error.signal);
                throw new Error();
            }
        });

        process.stdout.on('data', function(data) {
            cb(data);
            removeTmpDir(tmpDir);
        });
        process.stderr.on('data', function (d) {
            console.error(d);
        });
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
