'use strict';

var path = require('path');
var winston = require('winston');

//
// Logging levels
//
var config = {
  levels: {
    silly: 0,
    verbose: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5
  },
  colors: {
    silly: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
};

var logger = module.exports = function(label) {

    label = path.relative(__dirname, label);

    var debug = false;
    if (process.env.DEBUG !== undefined) {
        debug = process.env.DEBUG === 'true';
    }

    return new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
            level: 'silly',
            silent: !debug,
            label: label,
            colorize: true,
            debug: false
        })
      ],
      levels: config.levels,
      colors: config.colors
    });

};
