'use strict';
var Logger = require('mcap-logger');
var serverconfig = require('mcaprc');
var path = require('path');
var log = require('../logger')(__filename);

module.exports = function(program){

    var serverName = 'default';
    var server = null;
    if (program.log === true) {
        server = serverconfig.get('default');
    } else if (program.log) {
        server = serverconfig.get(program.log);
    }
    if (!server) {
        return log.info('Invalid server');
    }
    var config = require(path.resolve(process.cwd(), 'mcap.json'));
    if (!config.uuid) {
        return log.info('Invalid UUID');
    }

    var logger = new Logger({
        auth: {
            'user': server.username,
            'pass': server.password
        },
        baseUrl: server.baseurl
    });

    logger.watch({
        name: 'javascript.applications.' + config.uuid
    }).then(function(){
        console.log('Successfully registered logger.');
    }, function(err){
        console.log('Error registering logger.', err);
    });

    logger.output = function(log){
        if (log) {
            Object.keys(log).forEach(function (l) {
                console.log(log[l].message);
            });
        }
    };
};
