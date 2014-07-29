'use strict';
var mcapApplicationValidation = require('mcap-application-validation');
var bar = require('progress-bar');
var mcapFileExchange = require('mcap-file-upload');
var serverconfig = require('mcaprc');
var logger = require('../logger')(__filename);

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
    if (program.args) {
        dir = program.args[0];
    }

    var validation = mcapApplicationValidation.validate(dir);
    if (validation === true) {
        var _bar = bar.create(process.stdout);
        _bar.format = '$bar; $percentage,2:0;% uploaded.';
        _bar.symbols.loaded = '#';
        _bar.symbols.notLoaded = '-';
        _bar.width = 50;
        var uploadConfig = {
            progress: function (percent) {
                _bar.update(percent / 100);
            },
            'path': dir,
            'url': server.baseurl,
            'auth': {
                'user': server.username,
                'pass': server.password
            },
            'deleteMissing': '',
            'overwrite': true,
            'remotePath': '/applications',
            'log': false
        };

        mcapFileExchange.upload(uploadConfig).then(function (data) {
            try {
                var _data = JSON.parse(data);
                console.log('\nUploaded state:' + _data.itemStatuses[0].severity);
            } catch (e) {

            }
        }).catch(function (e) {
            console.log('\nerror', e);
        });
    }
    else {
        console.error(validation);
    }
}
module.exports.deploy = deploy;
