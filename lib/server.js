var fs = require('fs');
var rc = require('rc');
var defaultConf = {
    "default": ""
};

/**
 * Select operation to given command
 * @param command the operation
 * @param attr the config attributes
 */
function parse( command, attr ) {
    if( command === 'add' ) {
        add(attr);
    } else if( command === 'list' ) {
        list(attr);
    } else if( command === 'info' ) {
        info(attr);
    } else if( command === 'remove' ) {
        remove(attr);
    }
}

/**
 * Add a server to the list
 * @param attr ['name', 'baseurl', 'username', 'password']
 * @returns {*}
 */
function add( attr ) {
    if( !attr ) {
        return;
    }

    var newServer = {};
    newServer[attr[0]] = {
        "baseurl": attr[1],
        "username": attr[2],
        "password": attr[3]
    };
    var conf = rc('mcapcli', _deepCopy(defaultConf), newServer);
    if(!conf.default){
        conf.default = attr[0];
    }
    return _save(conf);
}

/**
 * Print all settings
 * @returns {*}
 */
function list() {
    // get the config
    var conf = rc('mcapcli', _deepCopy(defaultConf));
    // print a cleaned version
    console.log(JSON.stringify(_clean(conf), null, 5));
    return conf;
}

function info() {
    // TODO
    return list();
}

/**
 * Remove a configuration
 * @param attr
 * @returns {*}
 */
function remove( attr ) {
    if( !attr ) {
        return;
    }
    // get the config
    var conf = rc('mcapcli', _deepCopy(defaultConf));
    // delete the given server
    delete conf[attr[0]];
    // [ 'default', 'config', '_' ]
    if(Object.keys(conf).length <= 3){
        // reset default if no server is present
        conf.default = defaultConf.default;
    }
    return _save(conf);
}

/**
 * Write a clean version of the config to the filesystem. The '.mcaprc' file must be present!
 * @param conf
 * @returns {*}
 * @private
 */
function _save(conf){
    // get the path
    var path = conf.config;
    // write a clean version of it
    fs.writeFileSync(path, JSON.stringify(_clean(conf), null, 3));
    return conf;
}

/**
 * Return a copy of the config without rc attributes
 * @param conf
 * @returns {*}
 * @private
 */
function _clean(conf){
    // deep copy
    var copy = _deepCopy(conf);
    // remove rc attributes
    delete copy._;
    delete copy.config;
    return copy;
}

/**
 * Copy the given object without functions!
 * @param conf
 * @returns {*}
 * @private
 */
function _deepCopy(conf){
    return JSON.parse(JSON.stringify(conf));
}

module.exports.parse = parse;
module.exports.add = add;
module.exports.list = list;
module.exports.info = info;
module.exports.remove = remove;