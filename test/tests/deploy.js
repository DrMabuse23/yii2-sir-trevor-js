'use strict';

var tap = require('tap');
var deploy = require('../../lib/command/deploy');
var path = require('path');

tap.test('deploy.prepare', function (t) {
    var rootPath = path.resolve(__dirname, '../');

    var program = { commands: [],
        deploy: 'test',
        args: [rootPath]
    };

    var uploadSettings = deploy.prepare(program);

    t.ok(uploadSettings, 'settings are not present');
    t.ok(typeof uploadSettings.progress === 'function', 'progress is not a function');
    t.ok(uploadSettings.username === 'test', 'username is invalid');
    t.ok(uploadSettings.password === 'test', 'password is invalid');
    t.ok(uploadSettings.rootPath === rootPath, 'rootPath is invalid');
    t.ok(uploadSettings.fields.name === 'MyTestApp', 'fields.name is invalid');
    t.ok(uploadSettings.fields.uuid === '0dbd6ba2-461b-4e88-b276-300e2758ad3d', 'fields.uuid is invalid');
    t.ok(uploadSettings.endpoint === '/my/awesome/endpoint', 'endpoint is not set correctly');

    t.end();
});
