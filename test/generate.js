var tap = require('tap');
var pz = require('promzard');
var spawn = require('child_process').spawn;

var node = process.execPath;
var output = '';
function respond (c, lastOutput, custom) {
    custom = custom || function(){
        c.stdin.write('\n');
    }
    var regex = new RegExp(lastOutput + ' $');
    if (output.match(regex)) {
        c.stdin.write('\n');
        c.stdin.end();
        return
    }

    custom(c, output);
    return
}

function spawnProcess(t, process, expect, lastAttributeOutput, custom){
    var c = spawn(node, [process], { customFds: [-1,-1,-1] });
    output = '';
    c.stdout.on('data', function (d) {
        output += d;
        respond(c, lastAttributeOutput, custom)
    });

    var actual = '';
    c.stderr.on('data', function (d) {
        actual += d
    });

    c.on('close', function () {
        console.error('actual', actual);
        console.error('expect', expect);
        actual = JSON.parse(actual);
        t.deepEqual(actual, expect);
        t.end()
    })
}

tap.test('bikini', function (t) {

    var process = require.resolve('./process/bikini.js');

    var expect =  {
        "name": "",
        "description": "",
        "endpoint": "",
        "model": "",
        "idAttribute": ""
    };

    var lastAttributeOutput = 'Models ID Attribute:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('connectionconfiguration', function (t) {

    var process = require.resolve('./process/connectionconfiguration.js');

    var expect =  {
        "name": "",
        "description": "",
        "configurationId": "",
        "configurationDescription": "",
        "authentication": "",
        "client": "",
        "user": "",
        "alias": "",
        "password": "",
        "language": "",
        "sapCookie": "",
        "x.509Certificate": "",
        "externalIdData": "",
        "externalIdType": "",
        "applicationServer": "",
        "systemNumber": "",
        "messageServer": "",
        "messagePort": "",
        "systemId": "",
        "logonGroup": "",
        "gatewayServer": "",
        "gatewayPort": "",
        "sapRouterString": "",
        "logonCheck": "",
        "logonCodepage": "",
        "logonCodepageType": "",
        "tableParameterDeltaMngmt": "",
        "getSsoTicket": "",
        "denyInitialPwds": "",
        "activeConnections": "",
        "idleConnections": "",
        "expirationTimeout": "",
        "expirationPeriod": "",
        "queuedTimeout": "",
        "sncMode": "",
        "sncPartner": "",
        "sncLevel": "",
        "sncName": "",
        "sncLibrary": "",
        "sncSso": "",
        "repositoryDestination": "",
        "repositoryUser": "",
        "repositoryPassword": "",
        "repositorySncMode": "",
        "repositoryRoundtripOptimization": "",
        "properties": {
            "key": {
                "type": "type",
                "value": "value"
            },
            "key1": {
                "type": "type1",
                "value": "value1"
            }
        },
        "factoryPid": "",
        "bundleLocation": ""
    };

    var lastAttributeOutput = 'Bundle Location:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput, function(c, output){
        if (output.match(/Properties \(key:type:value key:type:value\): $/)) {
            c.stdin.write('key:type:value key1:type1:value1\n');
            return
        }
        c.stdin.write('\n');
    });
});

tap.test('model', function (t) {

    var process = require.resolve('./process/model.js');

    var expect =  {
        "name": "book",
        "label": "book",
        "attributes": {
            "author": {
                "type": "string",
                "mandatory": false,
                "key": false
            },
            "isbn": {
                "type": "integer",
                "mandatory": "mandatory",
                "key": "key"
            }
        }
    };

    var lastAttributeOutput = 'Models ID Attribute:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput, function(c, output){
        if (output.match(/Name: $/)) {
            c.stdin.write('book\n');
            return
        }
        if (output.match(/Attributes \(name:type:mandatory:key name:type:mandatory:key\): $/)) {
            c.stdin.write('author:string isbn:integer:mandatory:key\n');
            c.stdin.end();
            return
        }
        c.stdin.write('\n');
    });
});

tap.test('rest', function (t) {

    var process = require.resolve('./process/rest.js');

    var expect =  {
        "name": "",
        "description": "",
        "connector": "",
        "protocol": "",
        "properties": {
            "descriptorUrl": "",
            "userName": "",
            "password": "",
            "jsonMediaType": "",
            "xmlMediaType": "",
            "oauthProviderType": ""
        }
    };

    var lastAttributeOutput = 'OAuth Provider Type:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('saprfc', function (t) {

    var process = require.resolve('./process/saprfc.js');

    var expect =  {
        "name": "",
        "description": "",
        "connector": "",
        "protocol": "",
        "properties": {
            "authentication": "",
            "client": "",
            "user": "",
            "alias": "",
            "password": "",
            "language": "",
            "sapCookie": "",
            "x.509Certificate": "",
            "externalIdDate": "",
            "externalIdType": "",
            "programServer": "",
            "programId": "",
            "rfcTrace": "",
            "cpicTrace": "",
            "repositoryDestination": "",
            "repositoryUser": "",
            "repositoryPassword": "",
            "repositorySncMode": "",
            "repositoryRoundtripOptimization": ""
        }
    };

    var lastAttributeOutput = 'Repository Roundtrip Optimization:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('soap', function (t) {

    var process = require.resolve('./process/soap.js');

    var expect =  {
        "name": "",
        "description": "",
        "connector": "",
        "protocol": "",
        "properties": {
            "descriptorUrl": "",
            "userName": "",
            "password": "",
            "messageSuffix": "",
            "soapVersion": "",
            "adressingFeautre": "",
            "mtomFeature": "",
            "oauthProviderType": ""
        }
    };

    var lastAttributeOutput = 'OAuth Provider Type:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});

tap.test('sql', function (t) {

    var process = require.resolve('./process/sql.js');

    var expect =  {
        "name": "",
        "description": "",
        "connector": "",
        "protocol": "",
        "properties": {
            "schema": ""
        }
    };

    var lastAttributeOutput = 'Schema:';

    //console.error('%s %s', node, process);
    spawnProcess(t, process, expect, lastAttributeOutput);
});