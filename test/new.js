'use strict';

var tap = require('tap');
var pz = require('promzard');
var spawn = require('child_process').spawn;
var utils = require('./util/utils');
var path = require('path');
var helper = require('./util/helpers');

var node = process.execPath;
var output = '';
function respond(c, lastOutput, custom) {
    custom = custom || function () {
        c.stdin.write('\n');
    };
    var regex = new RegExp(lastOutput + ' $');
    var testOut = [
        'Name: ',
        'Package: (com.company.app) '
    ];
    if (output.match(regex)) {
        c.stdin.write('myIndiTemplate\n');
        c.stdin.end();
        return;
    } else if (output === testOut[0]) {
        c.stdin.write('name\n');
        return;
    } else if (output === testOut[0] + testOut[1]) {
        c.stdin.write('de.mway.test\n');
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
//        console.error('actual', actual);
//        console.error('expect', expect);
        actual = JSON.parse(actual);
        t.deepEqual(actual, expect);
        t.end();
    });
}

tap.test('new app', function (t) {

    var process = require.resolve('./process/new.js');

    var expect = {
        'templateValues': {
            'name': 'name',
            'package': 'de.mway.test'
        },
        'template': 'myIndiTemplate'
    };

    var lastAttributeOutput = 'Template: \\(helloworld\\)';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('run mcap new without any arguments', function(t) {

    utils.executeCommand('../../cli.js', ['new'], function(output) {
        //console.error(t.deepEqual);
        t.equal(output.toString(), 'Name: ', 'first output should be Name:');
        t.end();
    });

});

tap.test('Create new app named testName', function(t) {

    utils.executeCommand('../../cli.js', ['new', 'testName'], function(output) {
        t.equal(output.toString(), '\u001b[32minfo\u001b[39m: [command/new.js] Done, without errors.\n', 'first output should be Name:');
        t.end();
    });

});

tap.test('WTF', function(t) {
    // Not sure why i need to do this?!
    // Without exiting manually, the previous test would never fail
    // no matter what i check
    process.exit(0);

});
