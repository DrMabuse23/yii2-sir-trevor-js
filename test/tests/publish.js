'use strict';

var tap = require('tap');
var publish = require('../../lib/command/publish');
var path = require('path');

tap.test('publish.prepare', function (t) {
    var rootPath = path.resolve(__dirname, '../');

    var program = { commands: [],
        publish: 'test',
        args: ['release', 'archive']
    };

    var uploadSettings = publish.prepare(program);

    t.ok(uploadSettings, 'settings are not present');
    t.ok(typeof uploadSettings.progress === 'function', 'progress is not a function');
    t.ok(uploadSettings.url === 'http://localhost', 'url is invalid');
    t.ok(uploadSettings.path.indexOf('/client') > 0, 'path is invalid');
    t.ok(typeof uploadSettings.zip === 'object', 'zip is invalid');
    t.ok(uploadSettings.zip.rootFolder === '', 'rootFolder is invalid');
    t.ok(typeof uploadSettings.auth === 'object', 'auth is invalid');
    t.ok(uploadSettings.auth.user === 'test', 'user is invalid');
    t.ok(uploadSettings.auth.pass === 'test', 'pass is invalid');
    t.ok(uploadSettings.releaseStatus === 'release', 'releaseStatus is invalid');
    t.ok(uploadSettings.archivationMode === 'archive', 'archivationMode is invalid');
    t.ok(uploadSettings.platforms.length === 2, 'platforms is invalid');
    t.ok(uploadSettings.platforms[0] === 'android', 'platforms is invalid');
    t.ok(uploadSettings.platforms[1] === 'ios', 'platforms is invalid');
    t.end();

});
