'use strict';

var request = require('request');
var assert = require('assert');

module.exports = function (server, cb) {
    assert(server, 'missing paramert server');
    assert(server.baseurl, 'missing parameter server.baseurl');
    assert(server.username, 'missing parameter server.username');
    assert(server.password, 'missing parameter server.password');
    assert(cb, 'missing callback');

    var url = server.baseurl;
    if (url.charAt(url.length - 1 !== '/')) {
        url += '/';
    }

    url += 'gofer/system/security/currentAuthorization';

    request.get(url, {
        'auth': {
            'user': server.username,
            'pass': server.password
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }, function (err, req, response) {
        try {
            var data = JSON.parse(response);
            cb(null, data);
        } catch (e) {
            cb(e);
        }
    });
};
