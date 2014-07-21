'use strict';

var fs = require('fs');
var tap = require('tap');
var serverConfig = require('mcapcli-serverconfig');

var defaultConf = {
    'default': ''
};

var emptyConf = {
    default: '',
    config: __dirname + '/.mcapclirc',
    _: []
};

var reset = function () {
    var conf = serverConfig.list();
    fs.writeFileSync(conf.config, JSON.stringify(defaultConf, null, 3));
};

var _deepCopy = function (conf) {
    return JSON.parse(JSON.stringify(conf));
};

tap.test('list', function (t) {

    reset();
    var config = serverConfig.list();
    t.deepEqual(config, emptyConf);
    reset();
    t.end();

});

tap.test('add', function (t) {

    reset();
    var config = serverConfig.add();
    t.deepEqual(config, emptyConf);

    config = serverConfig.add({});
    var added = _deepCopy(emptyConf);
    t.deepEqual(config, added);

    reset();
    config = serverConfig.add([]);
    added = _deepCopy(emptyConf);
    t.deepEqual(config, added);

    reset();
    config = serverConfig.add(['a']);
    added = _deepCopy(emptyConf);
    added['default'] = 'a';
    delete added._;
    added.a = {
        'baseurl': '',
        'username': '',
        'password': ''
    };
    t.deepEqual(config, added);

    reset();
    config = serverConfig.add(['a', 'b']);
    added = _deepCopy(emptyConf);
    added['default'] = 'a';
    delete added._;
    added.a = {
        'baseurl': 'b',
        'username': '',
        'password': ''
    };
    t.deepEqual(config, added);

    reset();
    config = serverConfig.add(['a', 'b', 'c']);
    added = _deepCopy(emptyConf);
    added['default'] = 'a';
    delete added._;
    added.a = {
        'baseurl': 'b',
        'username': 'c',
        'password': ''
    };
    t.deepEqual(config, added);

    reset();
    config = serverConfig.add(['a', 'b', 'c', 'd']);
    added = _deepCopy(emptyConf);
    added['default'] = 'a';
    delete added._;
    added.a = {
        'baseurl': 'b',
        'username': 'c',
        'password': 'd'
    };
    t.deepEqual(config, added);
    reset();
    t.end();

});

tap.test('remove', function (t) {

    reset();
    var config = serverConfig.add(['a', 'b', 'c', 'd']);
    var added = _deepCopy(emptyConf);
    added['default'] = 'a';
    delete added._;
    added.a = {
        'baseurl': 'b',
        'username': 'c',
        'password': 'd'
    };
    t.deepEqual(config, added);

    config = serverConfig.add(['a1', 'b1', 'c1', 'd1']);
    var added1 = _deepCopy(added);
    added1.a1 = {
        'baseurl': 'b1',
        'username': 'c1',
        'password': 'd1'
    };
    t.deepEqual(config, added1);
    config = serverConfig.remove(['a1']);
    delete config._;
    t.deepEqual(config, added);
    config = serverConfig.remove(['a']);
    t.deepEqual(config, emptyConf);
    reset();
    t.end();

});

tap.test('default', function (t) {

    reset();
    serverConfig.add(['a', 'b', 'c', 'd']);
    serverConfig.add(['a1', 'b1', 'c1', 'd1']);
    var config = serverConfig.add(['a2', 'b2', 'c2', 'd2']);
    var added = _deepCopy(config);

    t.deepEqual(config, added);

    added = serverConfig.setDefault('a1');
    config['default'] = 'a1';
    delete config._;
    delete added._;
    t.deepEqual(config, added);

    added = serverConfig.setDefault('a2');
    config['default'] = 'a2';
    delete config._;
    delete added._;
    t.deepEqual(config, added);

    t.notOk(serverConfig.setDefault(), 'missing param');
    t.notOk(serverConfig.setDefault({}), 'wrong param type');
    t.notOk(serverConfig.setDefault([]), 'wrong param type');
    t.notOk(serverConfig.setDefault(1), 'wrong param type');
    t.notOk(serverConfig.setDefault(0), 'wrong param type');
    t.notOk(serverConfig.setDefault(2), 'wrong param type');
    t.notOk(serverConfig.setDefault(-1), 'wrong param type');
    t.notOk(serverConfig.setDefault(undefined), 'wrong param type');
    t.notOk(serverConfig.setDefault(null), 'wrong param type');
    t.notOk(serverConfig.setDefault('xxxx'), 'wrong param');
    reset();
    t.end();

});
