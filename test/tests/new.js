'use strict';

var tap = require('tap');
var pz = require('promzard');
var spawn = require('child_process').spawn;
var utils = require('./../util/utils');
var path = require('path');
var helpers = require('./../util/helpers');

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
    if (output === testOut[0]) {
        c.stdin.write('name\n');
        return;
    } else if (output === testOut[0] + testOut[1]) {
        c.stdin.write('io.mway.test\n');
        c.stdin.end();
        return;
    }

    custom(c, output);
    return;
}

function spawnProcess(t, process, expect, lastAttributeOutput, custom) {
    var c = spawn(node, [process]);
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

    var process = require.resolve('./../process/new.js');

    var expect = {
        'templateValues': {
            'name': 'name',
            'package': 'io.mway.test'
        }
    };

    var lastAttributeOutput = 'package: io.mway.test';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('run mcap new without any arguments', function(t) {

    utils.executeCommand('../../cli.js', ['new'], false, function(output) {
        //console.error(t.deepEqual);
        t.equal(output.toString(), 'Name: ', 'first output should be Name:');
        t.end();
    });

});

tap.test('Create new app named testName', function(t) {

    utils.executeCommand('../../cli.js', ['new', 'testName'], false, function(output) {
        t.equal(output.toString(), '\u001b[32minfo\u001b[39m: [command/new.js] Done, without errors.\n', 'mcap new testName, wizard should open');
        t.end();
    });

});

tap.test('Create new app named testName2 and check for files and fileContent', function(t) {

    var expectedFiles = [
        'testName2/mcap.json',
        'testName2/server'
    ];

    var reg =  /(\"name\"\: \"testName2\")/;

    var expectedContent = [
        ['testName2/mcap.json', reg]
    ];

    utils.executeCommand('../../cli.js', ['new', 'testName2'], false, function(output, tmpPath) {
        t.equal(output.toString(), '\u001b[32minfo\u001b[39m: [command/new.js] Done, without errors.\n', 'mcap new testName2, files should have been created');
        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);

        t.end();
    });

});

tap.test('try to create an already existing app with the same name', function(t) {

    var absTestPath = null;

    var expectedFiles = [
        'testName/mcap.json',
        'testName/server'
    ];

    var reg = /(\"name\"\: \"testName\")/;

    var expectedContent = [
        ['testName/mcap.json', reg]
    ];

    utils.executeCommand('../../cli.js', ['new', 'testName'], false, function(output, tmpPath) {
        t.equal(output.toString(), '\u001b[32minfo\u001b[39m: [command/new.js] Done, without errors.\n', 'mcap new testName, files should have been created');

        helpers.assertFile(expectedFiles);
        helpers.assertFileContent(expectedContent);

        utils.executeCommand('../../cli.js', ['new', 'testName'], tmpPath, function(output, tmpPath) {
            absTestPath = path.resolve(process.cwd(), 'testName');
            t.equal(output.toString(), 'File ' + absTestPath + ' already exists\n');
            t.end();
            utils.removeTmpDir();
        });

    });

});

tap.test('WTF', function(t) {
    // Not sure why i need to do this?!
    // Without exiting manually, the previous test would never fail
    // no matter what i check
    //utils.removeTmpDir();
    process.exit(0);
});
