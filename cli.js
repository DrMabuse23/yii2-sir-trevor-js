#!/usr/bin/env node
'use strict';

var program = require('commander');
var cmdComponent = require('./lib/command/component');
var cmdNew = require('./lib/command/new');
var cmdServer = require('./lib/command/server');
var cmdDeploy = require('./lib/command/deploy');
var cmdLog = require('./lib/command/log');
var checkProject = require('./lib/check_project');
var packageJSON = require('./package.json');

function commandInfo() {
    console.log('Version', program._version);
}

program
    .version(packageJSON.version)
    .option('info', 'Display the configuration and information')
    .option('new [name] [package]', 'generates a skeletal mCAP Application in the current directory. If no param is given a wizard will guide you.')
    .option('server <list>', 'List all server')
    .option('server <add> [alias] [URI] [user] [pass]', 'Add a server configuration')
    .option('server <remove> [alias]', 'Remove a server configuration')
    .option('server <info> [alias]', 'See the server configuration')
    .option('server <default> [alias]', 'List all server')
    .option('log [alias]', 'Live logger of the given server')
    .option('deploy [alias] [path]', 'Deploy the application to the given server')
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
else if (program.server) {
    cmdServer(program);
}
else if (program.log) {
    if (checkProject.isInsideProject(true)) {
        cmdLog(program);
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
