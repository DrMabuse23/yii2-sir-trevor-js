'use strict';

var fs = require('fs');
var path = require('path');

module.exports.isInsideProject = function (verbose) {
    var isInside = fs.existsSync(path.normalize(process.cwd() + '/mcap.json'));
    if (verbose === true && isInside === false) {
        console.error('Not inside a mCAP Project');
    }
    return isInside;
};

module.exports.fileExists = function (name, verbose) {
    if (!name) {
        return void null;
    }
    var _path = path.normalize(process.cwd() + '/' + name);
    var exists = fs.existsSync(_path);
    if (verbose === true && exists === true) {
        console.error('File ' + _path + ' already exists');
    }
    return exists;
};
