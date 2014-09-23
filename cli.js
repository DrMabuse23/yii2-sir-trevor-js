#!/usr/bin/env node
'use strict';

var program = require('commander');
var cmdComponent = require('./lib/command/component');
var cmdNew = require('./lib/command/new');
var cmdServer = require('./lib/command/server');
var cmdDeploy = require('./lib/command/deploy');
var cmdServe = require('./lib/command/serve');
var cmdPublish = require('./lib/command/publish');
var cmdLog = require('./lib/command/log');
var checkProject = require('./lib/check_project');
var packageJSON = require('./package.json');
var printCat = require('./lib/printcat');

function commandInfo() {
    printCat.log('Version', program._version);
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
    .option('publish [alias] [releaseStatus] [archivationMode]', 'Publish the Client Application to Relution. Defaults: releaseStatus: DEVELOPMENT archivationMode: archive')
    .option('serve [alias]', 'Starts a local webserver and serves the client app with live reload. Set an alias for DataSync requests.')
    .option('generate <component>', 'Generate a mCAP Component. Available components: ' + cmdComponent.getComponentList().join(', '))
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
else if (program.publish) {
    cmdPublish.publish(program);
}
else if (program.serve) {
    cmdServe.serve(program);
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
    console.log('');
    console.log('mCAP CLI');
    console.log('');
    console.log('  To ignore files create a `.mcapignore` file inside the root directory. The containing files and folders are not deployed to the server.');
    console.log('  Use gulp glob pattern: Folder: folderName/**');
    console.log('');
    console.log('  Pro Tip: Change the deploy endpoint by setting "endpoint": "/studio/upload" of a server inside the .mcaprc.');
    program.help();
}

module.exports = program;
