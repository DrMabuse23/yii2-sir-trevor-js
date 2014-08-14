'use strict';
var mcapApplicationValidation = require('mcap-application-validation');
var bar = require('progress-bar');
var path = require('path');
var serverconfig = require('mcaprc');
var logger = require('../logger')(__filename);
var mcapDeploy = require('mcap-deploy');

function deploy(program) {
    var server = null;
    if (program.deploy === true) {
        server = serverconfig.get('default');
    }
    else if (program.deploy) {
        server = serverconfig.get(program.deploy);
    }
    if (!server) {
        return logger.info('Not supported');
    }
    var dir = process.cwd();
    if (program.args.length > 0) {
        dir = program.args[0];
    }

    var validation = mcapApplicationValidation.validate(dir);
    if (validation === true) {
        var config = require(path.resolve(dir, 'mcap.json'));
        var _bar = bar.create(process.stdout);
        _bar.format = '$bar; $percentage,2:0;% uploaded.';
        _bar.symbols.loaded = '#';
        _bar.symbols.notLoaded = '-';
        _bar.width = 50;
        var uploadConfig = {
            progress: function (percent) {
                _bar.update(percent / 100);
                if (percent >= 100) {
                    console.log('\nCreate/Update application on ' + server.baseurl);
                }
            },
            baseurl: server.baseurl,
            'username': server.username,
            'password': server.password,
            rootPath: path.normalize(dir),
            fields: {
                name: config.name,
                uuid: config.uuid
            }
        };

        mcapDeploy.deploy(uploadConfig).then(function (data) {
            console.log('Successfull created Application:\n' + server.baseurl + '/gofer/gui/application.html#application-modify?uuid=' + config.uuid);
        }).catch(function (e) {
            console.log('\nerror', e);
        });
    }
    else {
        console.error(validation);
    }
}
module.exports.deploy = deploy;
