'use strict';

var label = null;
module.exports = {

    'name': (function () {
        return prompt('Name', '', function (name) {
            label = name;
            return name;
        });
    })(),

    'label': prompt(function (val) {
        return val || label;
    }),

    //'description': prompt('description', ''),

    'attributes': prompt(function (val) {
        if (!val) {
            return undefined;
        }
        if (Array.isArray(val)) {
            val = val.join(' ');
        }
        if (typeof val !== 'string') {
            return val;
        }

        var res = {};
        val.split(/[\s,]+/).forEach(function (attr) {
            attr = attr.split(':');
            res[attr[0]] = {
                'type': attr[1] || '',
                'mandatory': attr[2] === 'true',
                'key': attr[3] === 'true'
            };
        });

        return res;
    }, 'Attributes (name:type:mandatory:key name:type:mandatory:key)')
};
