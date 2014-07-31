'use strict';

var path = require('path');
var logger = require('../logger')(__filename);
var promzard = require('promzard');
var serverconfig = require('mcaprc');

var generatePath = '../../generate/server/';

function onEnd(command){
    if (command !== 'list') {
        serverconfig.parse('list');
    }
}

function serverAddByWizard(command) {
    var file = path.resolve(__dirname, generatePath + 'add.js');
    var ctx = { basename: path.basename(path.dirname(file)) };
    promzard(file, ctx, function (er, options) {
        if (er) {
            throw er;
        }
        logger.debug(options);
        // ['name', 'baseurl', 'username', 'password']
        serverconfig.parse(command, [options.name, options.baseurl, options.username, options.password]);
        onEnd(command);
    });
}

function generate(program) {

    if (program.args.length > 0) {
        serverconfig.parse(program.server, program.args);
        onEnd(program.server);
    }
    else {
        serverAddByWizard(program.server);
    }

}

module.exports = generate;
