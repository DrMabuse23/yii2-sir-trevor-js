'use strict';
var _ = require('lodash');
var mcapApplicationValidation = require('mcap-application-validation');
var bar = require('progress-bar');
var path = require('path');
var serverconfig = require('mcaprc');
var logger = require('../logger')(__filename);
var mcapDeploy = require('mcap-deploy');
var printCat = require('../printcat');
var chalk = require('chalk');
var mcapJson = null;

var fileUpload = require('relution-file-upload');

function prepare(program) {
    var server = null;
    var serverName = 'default';
    if (program.publish === true) {
        server = serverconfig.get('default');
    } else if (program.publish) {
        server = serverconfig.get(program.publish);
        serverName = program.publish;
    }
    if (!server) {
        return printCat.error('Missing server configuration or missing server instance.');
    }
    var dir = process.cwd();
    var releaseStatus = 'DEVELOPMENT';
    var archivationMode = 'archive';

    if (program.args.length > 0) {
        releaseStatus = program.args[0];
        archivationMode = program.args[1];
    }

    var _bar = bar.create(process.stdout);
    _bar.format = '$bar; $percentage,2:0;% uploaded.';
    _bar.symbols.loaded = '#';
    _bar.symbols.notLoaded = '-';
    _bar.width = 50;
    var uploadConfig = {
        progress: function (percent) {
            _bar.update(percent / 100);
            if (percent >= 100) {
                printCat.info('\nUploaded to Relution.');
            }
        },
        url: server.baseurl,
        path: path.resolve(path.normalize(dir) + '/client/'),
        zip: {
            rootFolder: ''
        },
        auth: {
            user: server.username,
            pass: server.password
        },
        releaseStatus: releaseStatus,
        archivationMode: archivationMode,
        platforms: [
            'android',
            'ios'
        ]
    };
    return uploadConfig;
}

function publish(program) {
    var config = prepare(program);
    if (!config) {
        return;
    }

    fileUpload.upload(config).then(function (appId) {
        var url = config.url;
        if (url.charAt(url.length - 1) !== '/') {
            url += '/';
        }
        url += 'relution/portal/#/apps/' + appId + '/information';
        printCat.success('Your application is now available in Relution!');
        printCat.log(chalk.underline(url));
    }).fail(function (err) {
        if (err && err.body) {
            try {
                var e = JSON.parse(err.body);
                logger.error(e.message);
                printCat.error(e.message);
            } catch (error) {
                logger.error(err);
                printCat.error(err);
                logger.error(error);
                printCat.error(error);
            }
        } else {
            logger.error(err);
            printCat.error(err);
        }
    });
}
module.exports.publish = publish;
module.exports.prepare = prepare;
