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
