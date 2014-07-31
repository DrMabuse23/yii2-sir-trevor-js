'use strict';

var path = require('path');
var fs = require('fs');
var logger = require('../logger')(__filename);
var promzard = require('promzard');
var Generator = require('mcap-generator-ionic');

var generatePath = '../../generate/new/';

function generate() {

    var file = path.resolve(__dirname, generatePath + 'app.js');
    var ctx = { basename: path.basename(path.dirname(file)) };
    promzard(file, ctx, function (er, options) {
        if (er) {
            throw er;
        }
        var gen = new Generator();

        logger.debug(options);

        var opt = {
            folderName: path.normalize(options.templateValues.name),
            template: options.template,
            templateValues: {
                name: options.templateValues.name,
                package: options.templateValues.package
            }
        };

        gen.createMcapApplicationInFolder(opt, function (err) {
            if (err) {
                logger.error(err);
                return;
            }
            logger.info('Done, without errors.');
        });
    });
}

module.exports = generate;
