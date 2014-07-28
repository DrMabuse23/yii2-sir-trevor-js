#!/usr/bin/env node
'use strict';

var program = require('commander');
var bar = require('progress-bar');
var mcapFileExchange = require('./node_modules/mcap-file-upload/lib/mcap-file-upload');

var component = require('./lib/component');
var notSupported = require('./lib/notSupported');
var serverconfig = require('mcaprc');

function commandInfo() {
    console.log('Version', program._version);
}

function commandNew() {
    console.log('new ...');
}

function commandExample() {
    console.log('example ...');
}

function commandServerConfig() {
    serverconfig.parse(program.server, program.args);
}

function commandLog() {
    console.log('log ' + program.log);
}

function commandDeploy() {
    var server = null;
    if (program.deploy === true) {
        server = serverconfig.get('default');
    }
    else if (program.deploy) {
        server = serverconfig.get(program.deploy);
    }
    if (!server) {
        return notSupported();
    }

    var _bar = bar.create(process.stdout);
    var uploadConfig = {
        progress: function (percent) {
            _bar.update(percent/100);
        },
        "path": "/Users/hano/Desktop/TestApp1",
        "url": server.baseurl,
        "auth": {
            "user": server.username + ':mway',
            "pass": server.password
        },
        "deleteMissing": "",
        "remotePath": "/applications/",
        "log": false
    };

    mcapFileExchange.upload(uploadConfig).then(function( data ) {
        console.log('\nSuccessfully Uploaded');
    }).catch(function( e ) {
        console.log('error', e);
    });

}

program
    .version('0.0.2')
    .option('info', 'Display the configuration and information')
    .option('new', 'generates a skeletal mCAP Application in the current directory')
    .option('example', 'Creates a mcap example application. Which shows a applications which is using push, security and dataSync')
    .option('server <add> [alias] [URI] [user] [pass]', 'Add a server configuration')
    .option('server <remove> [alias]', 'Remove a server configuration')
    .option('server <info> [alias]', 'See the server configuration')
    .option('server <list>', 'List all server')
    .option('server <default> [alias]', 'List all server')
    .option('log [alias]', 'Live logger of the given server')
    .option('deploy [alias]', 'Deploy the application to the given server')
    .option('generate <component>', 'Generate a mCAP Component, components: ' + component.getComponentList().join(', '))
    .parse(process.argv);

if (program.generate) {
    component.generate(program.generate);
}
else if (program.info) {
    commandInfo();
}
else if (program.new) {
    commandNew();
}
else if (program.example) {
    commandExample();
}
else if (program.server) {
    commandServerConfig();
}
else if (program.log) {
    commandLog();
}
else if (program.deploy) {
    commandDeploy();
}

module.exports = program;
