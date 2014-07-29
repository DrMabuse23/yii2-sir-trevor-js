#!/usr/bin/env node
//'use strict';

var program = require('commander');
var bar = require('progress-bar');
var mcapFileExchange = require('mcap-file-upload');

var component = require('./lib/component');
var notSupported = require('./lib/notSupported');
var serverconfig = require('mcaprc');
var mcapApplicationValidation = require('mcap-application-validation');

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
    var dir = process.cwd();
    if (program.args) {
        dir = program.args[0];
    }

    var validation = mcapApplicationValidation.validate(dir);
    if (validation === true) {
        var _bar = bar.create(process.stdout);
        _bar.format = '$bar; $percentage,2:0;% uploaded.';
        _bar.symbols.loaded	= '#';
        _bar.symbols.notLoaded	= '-';
        _bar.width = 50;
        var uploadConfig = {
            progress: function (percent) {
                _bar.update(percent / 100);
            },
            "path": dir,
            "url": server.baseurl,
            "auth": {
                "user": server.username,
                "pass": server.password
            },
            "deleteMissing": "",
            "overwrite": true,
            "remotePath": "/applications",
            "log": false
        };

        mcapFileExchange.upload(uploadConfig).then(function (data) {
            try {
                var _data = JSON.parse(data);
                console.log('\nUploaded state:' + _data.itemStatuses[0].severity)
            } catch (e) {

            }
        }).catch(function (e) {
            console.log('\nerror', e);
        });
    }
    else {
        console.error(validation);
    }
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
    .option('deploy [alias] [path]', 'Deploy the application to the given server')
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
