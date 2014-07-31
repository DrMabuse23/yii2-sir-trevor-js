'use strict';
var fs = require('fs');
var path = require('path');

module.exports.isInsideProject = function () {
    return fs.existsSync(path.normalize(process.cwd() + '/mcap.json'));
};
