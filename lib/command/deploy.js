'use strict';
var _ = require('lodash');
var mcapApplicationValidation = require('mcap-application-validation');
var bar = require('progress-bar');
var path = require('path');
var serverconfig = require('mcaprc');
var logger = require('../logger')(__filename);
var mcapDeploy = require('mcap-deploy');
var mcapJson = null;

function prepare(program) {
    var server = null;
    var serverName = 'default';
    if (program.deploy === true) {
        server = serverconfig.get('default');
    } else if (program.deploy) {
        server = serverconfig.get(program.deploy);
        serverName = program.deploy;
    }
    if (!server) {
        return logger.info('Invalid server');
    }
    var dir = process.cwd();
    if (program.args.length > 0) {
        dir = program.args[0];
    }

    var validation = mcapApplicationValidation.validate(dir);
    if (validation === true) {
        mcapJson = require(path.resolve(dir, 'mcap.json'));
        var _bar = bar.create(process.stdout);
        _bar.format = '$bar; $percentage,2:0;% uploaded.';
        _bar.symbols.loaded = '#';
        _bar.symbols.notLoaded = '-';
        _bar.width = 50;
        var uploadConfig = {
            progress: function (percent) {
                _bar.update(percent / 100);
                if (percent >= 100) {
                    console.log('\nCreate/Update application on ' + serverName);
                }
            },
            baseurl: server.baseurl,
            username: server.username,
            password: server.password,
            rootPath: path.normalize(dir),
            fields: {
                name: mcapJson.name,
                uuid: mcapJson.uuid
            }
        };

        return uploadConfig;
    }
    else {
        console.error(validation);
    }
}

function deploy(program) {
    var config = prepare(program);
    if (!config) {
        return;
    }

    mcapDeploy.deploy(config).then(function (data) {
        _.each(data.response.error, function (msg) {
            logger.error(msg);
        });
        _.each(data.response.verbose, function (msg) {
            logger.verbose(msg);
        });
        _.each(data.response.info, function (msg) {
            logger.info(msg);
        });
        //logger.verbose('Successfull created Application:\n' + config.baseurl + '/gofer/gui/application.html#application-modify?uuid=' + config.fields.uuid);
        logger.verbose('Your application is now available:\n' + data.endpoint + mcapJson.baseAlias);
    }).catch(function (e) {
        logger.error(e);
    });
}
module.exports.deploy = deploy;
module.exports.prepare = prepare;
