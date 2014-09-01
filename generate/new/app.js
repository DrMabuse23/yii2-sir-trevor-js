'use strict';

var check = require('../../lib/check_project');

module.exports = {
    'templateValues': {
        'name': prompt(function (val) {
            if (check.fileExists(val, true)) {
                process.exit(1);
            }
            return val;
        }, 'Name'),
        'package': prompt('Package', 'com.company.app')
    }
};
