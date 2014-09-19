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
//        console.error('actual', actual);
//        console.error('expect', expect);
        actual = JSON.parse(actual);
        t.deepEqual(actual, expect);
        t.end();
    });
}

tap.test('model', function (t) {

    var process = require.resolve('./../process/model.js');

    var expect = {
        'name': 'book',
        'label': 'book',
        'attributes': {
            'author': {
                'type': 'string',
                'mandatory': false,
                'key': false
            },
            'isbn': {
                'type': 'integer',
                'mandatory': true,
                'key': false
            }
        }
    };

    var lastAttributeOutput = 'Models ID Attribute:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput, function (c, output) {
        if (output.match(/Name: $/)) {
            c.stdin.write('book\n');
            return;
        }
        if (output.match(/Attributes \(name:type:mandatory:key name:type:mandatory:key\): $/)) {
            c.stdin.write('author:string isbn:integer:true:key\n');
            c.stdin.end();
            return;
        }
        c.stdin.write('\n');
    });
});

tap.test('rest', function (t) {

    var process = require.resolve('./../process/rest.js');

    var expect = {
        name: '',
        description: '',
//        connectorProvider: 'HTTP',
//        protocol: 'com.mwaysolutions.mcap.connector.http.RestConnectionConfig',
        type: 'rest',
        properties: {
            descriptorUrl: '',
            userName: '',
            password: ''
        }
    };

    var lastAttributeOutput = 'Password:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('sap', function (t) {

    var process = require.resolve('./../process/sap.js');

    var expect = {
        'name': '',
        'description': '',
        'connector': '',
        'protocol': '',
        'properties': {
            'authentication': '',
            'client': '',
            'user': '',
            'alias': '',
            'password': '',
            'language': '',
            'sapCookie': '',
            'x.509Certificate': '',
            'externalIdDate': '',
            'externalIdType': '',
            'programServer': '',
            'programId': '',
            'rfcTrace': '',
            'cpicTrace': '',
            'repositoryDestination': '',
            'repositoryUser': '',
            'repositoryPassword': '',
            'repositorySncMode': '',
            'repositoryRoundtripOptimization': ''
        }
    };

    var lastAttributeOutput = 'Repository Roundtrip Optimization:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('soap', function (t) {

    var process = require.resolve('./../process/soap.js');

    var expect = {
        'name': '',
        'description': '',
        'connector': '',
        'protocol': '',
        'properties': {
            'descriptorUrl': '',
            'userName': '',
            'password': '',
            'messageSuffix': '',
            'soapVersion': '',
            'adressingFeautre': '',
            'mtomFeature': '',
            'oauthProviderType': ''
        }
    };

    var lastAttributeOutput = 'OAuth Provider Type:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('sql', function (t) {

    var process = require.resolve('./../process/sql.js');

    var expect = {
        'name': '',
        'description': '',
        'connector': '',
        'protocol': '',
        'properties': {
            'schema': ''
        }
    };

    var lastAttributeOutput = 'Schema:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('calling mcap generate should throw an error if you\'re not in a mcap-project', function (t) {
    utils.executeCommand('../../cli.js', ['generate', 'model'], false, function (output, tmpPath) {
        t.equal(output.toString(), 'Not inside a mCAP Project\n');
        utils.executeCommand('../../cli.js', ['generate', 'rest'], false, function (output, tmpPath) {
            t.equal(output.toString(), 'Not inside a mCAP Project\n');

            utils.executeCommand('../../cli.js', ['generate', 'sap'], false, function (output, tmpPath) {
                t.equal(output.toString(), 'Not inside a mCAP Project\n');

                utils.executeCommand('../../cli.js', ['generate', 'soap'], false, function (output, tmpPath) {
                    t.equal(output.toString(), 'Not inside a mCAP Project\n');

                    utils.executeCommand('../../cli.js', ['generate', 'sql'], false, function (output, tmpPath) {
                        t.equal(output.toString(), 'Not inside a mCAP Project\n');
                        t.end();
                    });
                });
            });
        });
    });

});

tap.test('calling mcap generate without any argument', function (t) {
    utils.executeCommand('../../cli.js', ['generate'], false, function (output, tmpPath) {
        t.equal(output.toString(), '\n');
        t.end();
    });
});

tap.test('WTF', function (t) {
    // Not sure why i need to do this?!
    // Without exiting manually, the previous test would never fail
    // no matter what i check

    process.exit(0);
});
