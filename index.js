#!/usr/bin/env node

var promzard = require('promzard');
var path = require('path');
var fs = require('fs');
var program = require('commander');

var generatePath = 'generate/';

function notSupported(){
    console.log('command not supported.');
}

function getComponentList(){
    var files =  fs.readdirSync(generatePath);
    var components = [];
    files.forEach(function(name){
        components.push(path.basename(name, '.js'));
    });
    return components;
}

function commandGenerate(){
    var file = path.resolve(__dirname, generatePath + program.generate + '.js');
    if(fs.existsSync(file)){
        var ctx = { basename: path.basename(path.dirname(file)) };
        promzard(file, ctx, function (er, res) {
            if (er){
                throw er;
            }
            console.log(JSON.stringify(res, null, 2));
        });
    } else {
        notSupported();
    }
}

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
    console.log('server ' + program.server + ' ' + (program.args[0] || ''));
}

function commandLog(){
    console.log('log ' + program.log);
}

program
    .version('0.0.1')
    .option('info', 'Display the configuration and information')
    .option('new', 'generates a skeletal mCAP Application in the current directory')
    .option('example', 'Creates a mcap example application. Which shows a applications which is using push, security and dataSync')
    .option('server <add> [alias]', 'Add a server configuration')
    .option('server <remove> [alias]', 'Remove a server configuration')
    .option('server <info> [alias]', 'See the server configuration')
    .option('server <list>', 'List all server')
    .option('log [alias]', 'Live logger of the given server')
    .option('generate <component>', 'Generate a mCAP Component, components: ' + getComponentList().join(', '))
    .parse(process.argv);

if (program.generate){
    commandGenerate();
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