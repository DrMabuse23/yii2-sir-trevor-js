var fs = require('fs');
var tap = require('tap');
var serverConfig = require('../lib/serverconfig');

var defaultConf = {
    "default": ""
};

var emptyConf = {
    default: '',
    config: __dirname + '/.mcapclirc',
    _: []
};

var reset = function() {
    var conf = serverConfig.list();
    fs.writeFileSync(conf.config, JSON.stringify(defaultConf, null, 3));
};

var _deepCopy = function (conf){
    return JSON.parse(JSON.stringify(conf));
};

tap.test('list', function( t ) {

    reset();
    var config = serverConfig.list();
    t.deepEqual(config, emptyConf);

    t.end();

});

tap.test('add', function( t ) {

    reset();
    var config = serverConfig.add();
    t.deepEqual(config, emptyConf);

    var config = serverConfig.add({});
    var added = _deepCopy(emptyConf);
    t.deepEqual(config, added);

    reset();
    var config = serverConfig.add([]);
    var added = _deepCopy(emptyConf);
    t.deepEqual(config, added);

    reset();
    var config = serverConfig.add(['a']);
    var added = _deepCopy(emptyConf);
    added['default'] = "a";
    delete added._;
    added['a'] = {
        "baseurl" : '',
        "username" : '',
        "password" : ''
    };
    t.deepEqual(config, added);

    reset();
    var config = serverConfig.add(['a', 'b']);
    var added = _deepCopy(emptyConf);
    added['default'] = "a";
    delete added._;
    added['a'] = {
        "baseurl" : 'b',
        "username" : '',
        "password" : ''
    };
    t.deepEqual(config, added);

    reset();
    var config = serverConfig.add(['a', 'b', 'c']);
    var added = _deepCopy(emptyConf);
    added['default'] = "a";
    delete added._;
    added['a'] = {
        "baseurl" : 'b',
        "username" : 'c',
        "password" : ''
    };
    t.deepEqual(config, added);

    reset();
    var config = serverConfig.add(['a', 'b', 'c', 'd']);
    var added = _deepCopy(emptyConf);
    added['default'] = "a";
    delete added._;
    added['a'] = {
        "baseurl" : 'b',
        "username" : 'c',
        "password" : 'd'
    };
    t.deepEqual(config, added);

    t.end();

});

tap.test('remove', function( t ) {

    reset();
    var config = serverConfig.add(['a', 'b', 'c', 'd']);
    var added = _deepCopy(emptyConf);
    added['default'] = "a";
    delete added._;
    added['a'] = {
        "baseurl" : 'b',
        "username" : 'c',
        "password" : 'd'
    };
    t.deepEqual(config, added);

    var config = serverConfig.add(['a1', 'b1', 'c1', 'd1']);
    var added1 = _deepCopy(added);
    added1['a1'] = {
        "baseurl" : 'b1',
        "username" : 'c1',
        "password" : 'd1'
    };
    t.deepEqual(config, added1);
    config = serverConfig.remove(['a1']);
    delete config._;
    t.deepEqual(config, added);
    config = serverConfig.remove(['a']);
    t.deepEqual(config, emptyConf);

    t.end();

});