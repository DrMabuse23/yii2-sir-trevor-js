#!/usr/bin/env node
'use strict';

var program = require('commander');
var cmdComponent = require('./lib/command/component');
var cmdNew = require('./lib/command/new');
var cmdDeploy = require('./lib/command/deploy');
var serverconfig = require('mcaprc');
var checkProject = require('./lib/check_project');

function commandInfo() {
    console.log('Version', program._version);
}

function commandExample() {
    console.log('example ...');
}

function commandServerConfig() {
    serverconfig.parse(program.server, program.args);
    if (program.server !== 'list') {
        console.log('Done without errors');
    }
}

function commandLog() {
    console.log('log ' + program.log);
}

program
    .version('0.0.2')
    .option('info', 'Display the configuration and information')
    .option('new [name] [package] [template]', 'generates a skeletal mCAP Application in the current directory. If no param is given a wizard will guide you.')
    .option('example', 'Creates a mcap example application. Which shows a applications which is using push, security and dataSync')
    .option('server <list>', 'List all server')
    .option('server <add> [alias] [URI] [user] [pass]', 'Add a server configuration')
    .option('server <remove> [alias]', 'Remove a server configuration')
    .option('server <info> [alias]', 'See the server configuration')
    .option('server <default> [alias]', 'List all server')
    .option('log [alias]', 'Live logger of the given server')
    .option('deploy [alias] <path>', 'Deploy the application to the given server')
    .option('generate <component>', 'Generate a mCAP Component, components: ' + cmdComponent.getComponentList().join(', '))
    .parse(process.argv);

if (program.generate) {
    if (checkProject.isInsideProject(true)) {
        cmdComponent.generate(program.generate);
    }
}
else if (program.info) {
    commandInfo();
}
else if (program.new) {
    cmdNew(program.new === true ? program.new : program);
}
else if (program.example) {
    commandExample();
}
else if (program.server) {
    commandServerConfig();
}
else if (program.log) {
    if (checkProject.isInsideProject(true)) {
        commandLog();
    }
}
else if (program.deploy) {
    if (program.args[0] || checkProject.isInsideProject(true)) {
        cmdDeploy.deploy(program);
    }
}
else {
    program.help();
}

module.exports = program;
