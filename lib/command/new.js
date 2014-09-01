'use strict';

var path = require('path');
var fs = require('fs');
var logger = require('../logger')(__filename);
var promzard = require('promzard');
var Generator = require('mcap-generator-ionic');
var check = require('../check_project');
var chalk = require('chalk');

var generatePath = '../../generate/new/';

function save(options) {
    var opt = {
        folderName: path.normalize(options.templateValues.name),
        template: options.template,
        templateValues: {
            name: options.templateValues.name,
            package: options.templateValues.package
        }
    };
    var gen = new Generator();
    gen.createMcapApplicationInFolder(opt, function (err) {
        if (err) {
            logger.error(err);
            return;
        }
        console.log(chalk.green('Done, without errors.'));
    });
}

function generateByArguments(program) {
    if (check.fileExists(program.new, true)) {
        process.exit(1);
    }
    var options = {
        template: 'helloworld',
        templateValues: {
            name: program.new || '',
            package: program.args[0] || ''
        }
    };

    save(options);
}

function generateByWizard() {
    var file = path.resolve(__dirname, generatePath + 'app.js');
    var ctx = { basename: path.basename(path.dirname(file)) };
    promzard(file, ctx, function (er, options) {
        if (er) {
            throw er;
        }
        options.template = 'helloworld';
        logger.debug(options);
        save(options);
    });
}

function generate(useWizard) {
    if (useWizard === true) {
        return generateByWizard();
    }
    return generateByArguments(arguments[0]);
}

module.exports = generate;
