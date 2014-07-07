#!/usr/bin/env node

var program = require('commander');

var component = require('./lib/component');
var server = require('./lib/server');

function commandInfo(){
    console.log('Version', program._version);
}

function commandNew(){
    console.log('new ...');
}

function commandExample(){
    console.log('example ...');
}

function commandServer(){
    server.parse(program.server, program.args);
}

function commandLog(){
    console.log('log ' + program.log);
}

program
    .version('0.0.1')
    .option('info', 'Display the configuration and information')
    .option('new', 'generates a skeletal mCAP Application in the current directory')
    .option('example', 'Creates a mcap example application. Which shows a applications which is using push, security and dataSync')
    .option('server <add> [alias] [URI] [user] [pass]', 'Add a server configuration')
    .option('server <remove> [alias]', 'Remove a server configuration')
    .option('server <info> [alias]', 'See the server configuration')
    .option('server <list>', 'List all server')
    .option('log [alias]', 'Live logger of the given server')
    .option('generate <component>', 'Generate a mCAP Component, components: ' + component.getComponentList().join(', '))
    .parse(process.argv);

if (program.generate){
    component.generate(program);
} else if(program.info){
    commandInfo();
} else if(program.new){
    commandNew();
} else if(program.example){
    commandExample();
} else if(program.server){
    commandServer();
} else if(program.log){
    commandLog();
}

module.exports = program;