'use strict';

var path = require('path');
var fs = require('fs');
var logger = require('../logger')(__filename);
var promzard = require('promzard');
var printCat = require('../printcat');
var chalk = require('chalk');

var generatePath = '../../generate/component/';
var Generator = require('mcap-generator-ionic');

function generateFile(component, data) {
    var options = {
        dest: data.name,
        data: data
    };
    var generator = new Generator();

    switch (component.toLocaleLowerCase()) {
        case 'bikini':
            generator.createBikini(options, function (err, destination) {
                if (err) {
                    logger.error(err);
                    printCat.error(err);
                    return;
                }
                printCat.log(chalk.green('Bikini Component successfully created. %s'), chalk.grey(destination));
            });
            break;
        case 'connectionconfiguration':
            generator.createConnectionConfiguration(options, function (err, destination) {
                if (err) {
                    logger.error(err);
                    printCat.error(err);
                    return;
                }
                printCat.log(chalk.green('Connection Configuration successfully created. %s'), chalk.grey(destination));
            });
            break;
        case 'model':
            generator.createModel(options, function (err, destination) {
                if (err) {
                    logger.error(err);
                    printCat.error(err);
                    return;
                }
                printCat.log(chalk.green('Model successfully created. %s'), chalk.grey(destination));
            });
            break;
        case 'rest':
        case 'saprfc':
        case 'soap':
        case 'sql':
            generator.createConnection(options, function (err, destination) {
                if (err) {
                    logger.error(err);
                    printCat.error(err);
                    return;
                }
                printCat.log(chalk.green('Connection successfully created. %s'), chalk.grey(destination));
            });
            break;
    }
}

function generate(component) {
    if (!component) {
        return false;
    }
    var file = path.resolve(__dirname, generatePath + component + '.js');
    if (fs.existsSync(file)) {
        var ctx = { basename: path.basename(path.dirname(file)) };
        promzard(file, ctx, function (er, res) {
            if (er) {
                throw er;
            }
            generateFile(component, res);
        });
    }
    else {
        printCat.error('Not supported');
        return false;
    }
}

function getComponentList() {
    var folder = path.resolve(__dirname, generatePath);
    var files = fs.readdirSync(folder);
    var components = [];
    files.forEach(function (name) {
        components.push(path.basename(name, '.js'));
    });
    return components;
}

module.exports.getComponentList = getComponentList;
module.exports.generate = generate;
