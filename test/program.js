'use strict';

var tap = require('tap');

tap.test('programm', function (t) {

    var program = require('../index.js');
    program.parse(['node', 'test', 'generate', 'bikini']);
    t.ok(program.generate, 'bikini');
    t.end();
});
