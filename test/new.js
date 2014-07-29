'use strict';

var tap = require('tap');
var pz = require('promzard');
var spawn = require('child_process').spawn;

var node = process.execPath;
var output = '';
function respond(c, lastOutput, custom) {
    custom = custom || function () {
        c.stdin.write('\n');
    };
    var regex = new RegExp(lastOutput + ' $');
    if (output.match(regex)) {
        c.stdin.write('\n');
        c.stdin.end();
        return;
    }

    custom(c, output);
    return;
}

function spawnProcess(t, process, expect, lastAttributeOutput, custom) {
    var c = spawn(node, [process], { customFds: [-1, -1, -1] });
    output = '';
    c.stdout.on('data', function (d) {
        output += d;
        respond(c, lastAttributeOutput, custom);
    });

    var actual = '';
    c.stderr.on('data', function (d) {
        actual += d;
    });

    c.on('close', function () {
        console.error('actual', actual);
        console.error('expect', expect);
        actual = JSON.parse(actual);
        t.deepEqual(actual, expect);
        t.end();
    });
}

tap.test('new app', function (t) {

    var process = require.resolve('./process/new.js');

    var expect = {
        'templateValues': {
            'name': '',
            'package': 'com.company.app'
        },
        'template': 'helloworld'
    };

    var lastAttributeOutput = 'Template: \\(helloworld\\)';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});
