'use strict';

var tap = require('tap');
var component = require('../../lib/command/component');

tap.test('getComponentList', function (t) {

    var expect = [
        'model',
        'rest',
        'sap',
        'soap',
        'sql' ];
    var list = component.getComponentList();

    t.deepEqual(list, expect);
    t.end();

});

tap.test('generate fail', function (t) {

    t.notOk(component.generate(), 'generate isn\'t available');
    t.notOk(component.generate('xyz'), 'generate isn\'t available');
    t.end();

});
