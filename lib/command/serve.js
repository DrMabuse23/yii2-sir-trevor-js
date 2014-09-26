'use strict';
var mcapServe = require('mcap-serve');
var serverconfig = require('mcaprc');
var path = require('path');
var log = require('../logger')(__filename);
var printCat = require('../printcat');
var getCurrentAuthentication = require('../currentAuthentication');

var getEndpoint = function (baseurl, orga, appName, api) {
    var endpoint = '';
    endpoint += baseurl;
    if (endpoint.charAt(endpoint.length - 1 !== '/')) {
        endpoint += '/';
    }
    endpoint += orga + '/';
    endpoint += appName;
    endpoint += api;
    return endpoint;
};

module.exports.prepare = function (program, cb) {
    var server = null;
    if (program.serve === true) {
        server = serverconfig.get('default');
    } else if (program.serve) {
        server = serverconfig.get(program.serve);
    }
    if (!server) {
        var err = 'Missing server configuration or missing server instance.';
        printCat.error(err);
        return log.info(err);
    }

    var dir = process.cwd();
    if (program.cwd) {
        dir = program.cwd;
    }
    var mcapJson = require(path.resolve(dir, 'mcap.json'));

    var appName = mcapJson.name;
    var api = '/api/dataSync';

    printCat.info('Fetching informations');
    getCurrentAuthentication(server, function (err, data) {
        var orga;

        if (data && data.organization && data.organization.uniqueName) {
            orga = data.organization.uniqueName;
        } else {
            orga = 'system';
            printCat.warning('App is running without connection to %s', server.baseurl);
        }

        cb(server.baseurl, orga, appName, api);
    });
};

module.exports.serve = function (program) {

    module.exports.prepare(program, function (baseurl, orga, appName, api) {
        mcapServe({
            root: './client',
            enableLivereload: true,
            endpoint: getEndpoint(baseurl, orga, appName, api)
        }, function(err) {
            if (err) {
                printCat.error(err);
                process.exit(1);
            }
        });
    });
};
