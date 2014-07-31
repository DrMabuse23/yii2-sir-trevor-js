'use strict';
var tap = require('tap');

tap.test('check project: isInsideProject', function (t) {
    var fs = require('fs');
    // there is no mcap.json
    var checkProject = require('../lib/check_project');
    // there is no mcap.json
    t.deepEqual(checkProject.isInsideProject(), false);
    // still not there
    t.deepEqual(fs.existsSync('mcap.json'), false);
    // ah now there is a mcap.json
    fs.writeFileSync('mcap.json');
    // so it should be true
    t.deepEqual(checkProject.isInsideProject(), true);
    // good bye mcap.json
    fs.unlinkSync('mcap.json');
    // really gone?
    t.deepEqual(fs.existsSync('mcap.json'), false);
    t.end();
});
