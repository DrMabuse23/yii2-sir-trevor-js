'use strict';

var tap = require('tap');
var sinon = require('sinon');
var request = require('request');
var currentAuthentication = require('../../lib/currentAuthentication');
var serve = require('../../lib/command/serve');

var returnValue = JSON.stringify({ user: { name: 'mway', uuid: '75933d6f-7837-434d-b450-f1c7158c354d', salutation: null, givenName: 'M-Way', surname: 'Super', position: null, email: 'admin@mwaysolutions.com', phone: null, country: null, preferences: {} }, organization: { name: 'mway', uuid: 'f8ad8e99-bc7a-4986-8fed-91a342bcafb5', uniqueName: 'mway' }, roles: [
    { name: 'ADMINISTRATORS', uuid: '01c72c9e-900c-4dd2-81af-e1f92d1ee786' },
    { name: 'APPLICATION_CREATOR', uuid: 'APPLICATION_CREATOR' },
    { name: 'APPLICATION_EDITOR', uuid: 'APPLICATION_EDITOR' },
    { name: 'APPLICATION_USER', uuid: 'APPLICATION_USER' },
    { name: 'ASSET_CREATOR', uuid: 'ASSET_CREATOR' },
    { name: 'ASSET_EDITOR', uuid: 'ASSET_EDITOR' },
    { name: 'ASSET_USER', uuid: 'ASSET_USER' },
    { name: 'CONNECTION_CREATOR', uuid: 'CONNECTION_CREATOR' },
    { name: 'CONNECTION_EDITOR', uuid: 'CONNECTION_EDITOR' },
    { name: 'CONNECTION_USER', uuid: 'CONNECTION_USER' },
    { name: 'FILTER_CREATOR', uuid: 'FILTER_CREATOR' },
    { name: 'FILTER_EDITOR', uuid: 'FILTER_EDITOR' },
    { name: 'FILTER_USER', uuid: 'FILTER_USER' },
    { name: 'GROUP_CREATOR', uuid: 'GROUP_CREATOR' },
    { name: 'GROUP_EDITOR', uuid: 'GROUP_EDITOR' },
    { name: 'GROUP_USER', uuid: 'GROUP_USER' },
    { name: 'LOGGER_CONFIGURATION_CREATOR', uuid: 'LOGGER_CONFIGURATION_CREATOR' },
    { name: 'LOGGER_CONFIGURATION_EDITOR', uuid: 'LOGGER_CONFIGURATION_EDITOR' },
    { name: 'LOGGER_CONFIGURATION_USER', uuid: 'LOGGER_CONFIGURATION_USER' },
    { name: 'LOG_VIEWER', uuid: 'LOG_VIEWER' },
    { name: 'METAMODEL_CREATOR', uuid: 'METAMODEL_CREATOR' },
    { name: 'METAMODEL_EDITOR', uuid: 'METAMODEL_EDITOR' },
    { name: 'METAMODEL_USER', uuid: 'METAMODEL_USER' },
    { name: 'MWAY', uuid: 'fd4498b0-ca95-4a9d-8157-7dbd1118cc0f' },
    { name: 'ORGANIZATION_USER', uuid: 'ORGANIZATION_USER' },
    { name: 'PIPELINE_CREATOR', uuid: 'PIPELINE_CREATOR' },
    { name: 'PIPELINE_EDITOR', uuid: 'PIPELINE_EDITOR' },
    { name: 'PIPELINE_USER', uuid: 'PIPELINE_USER' },
    { name: 'PUSH_SERVICE_CREATOR', uuid: 'PUSH_SERVICE_CREATOR' },
    { name: 'PUSH_SERVICE_EDITOR', uuid: 'PUSH_SERVICE_EDITOR' },
    { name: 'PUSH_SERVICE_USER', uuid: 'PUSH_SERVICE_USER' },
    { name: 'SCHEDULED_TASK_CREATOR', uuid: 'SCHEDULED_TASK_CREATOR' },
    { name: 'SCHEDULED_TASK_EDITOR', uuid: 'SCHEDULED_TASK_EDITOR' },
    { name: 'SCHEDULED_TASK_USER', uuid: 'SCHEDULED_TASK_USER' },
    { name: 'USER_CREATOR', uuid: 'USER_CREATOR' },
    { name: 'USER_EDITOR', uuid: 'USER_EDITOR' },
    { name: 'USER_USER', uuid: 'USER_USER' },
    { name: 'WEBSERVICE_DEFINITION_CREATOR', uuid: 'WEBSERVICE_DEFINITION_CREATOR' },
    { name: 'WEBSERVICE_DEFINITION_EDITOR', uuid: 'WEBSERVICE_DEFINITION_EDITOR' },
    { name: 'WEBSERVICE_DEFINITION_USER', uuid: 'WEBSERVICE_DEFINITION_USER' },
    { name: 'mway', uuid: '75933d6f-7837-434d-b450-f1c7158c354d' }
] });

tap.test('currentAuthentication', function (t) {
    sinon.stub(request, 'get', function (url, data, cb) {
        t.ok(url.toString() === 'http://localhost:3000/gofer/system/security/currentAuthorization', 'baseurl is not set correctly is not set correctly');
        t.ok(data.auth.pass === 'secure123', 'password is not set correctly');
        t.ok(data.auth.user === 'superadmin', 'user is not set correctly');

        cb(null, null, returnValue);
    });

    currentAuthentication({
        password: 'secure123',
        username: 'superadmin',
        baseurl: 'http://localhost:3000'
    }, function (err, data) {
        request.get.restore();
        t.end();
    });

});

tap.test('serve prepare', function (t) {
    sinon.stub(request, 'get', function (url, data, cb) {
        t.ok(url.toString() === 'http://localhost/gofer/system/security/currentAuthorization', 'endpoint is not set correctly');
        t.ok(data.auth.pass === 'test', 'password is not set correctly');
        t.ok(data.auth.user === 'test', 'user is not set correctly');

        cb(null, null, returnValue);
    });

    serve.prepare({
        serve: true,
        cwd: '../'
    }, function (baseurl, orga, appName, api) {
        t.ok(baseurl === 'http://localhost', 'baseurl is not set correctly');
        t.ok(orga === 'mway', 'orga is not set correctly');
        t.ok(appName === 'MyTestApp', 'appName is not set correctly');
        t.ok(api === '/api/dataSync', 'api is not set correctly');

        request.get.restore();
        t.end();
    });

});

tap.test('serve prepare', function (t) {
    sinon.stub(request, 'get', function (url, data, cb) {
        t.ok(url.toString() === 'http://localhost/gofer/system/security/currentAuthorization', 'endpoint is not set correctly');
        t.ok(data.auth.pass === 'test', 'password is not set correctly');
        t.ok(data.auth.user === 'test', 'user is not set correctly');

        cb(null, null, returnValue);
    });

    serve.prepare({
        serve: 'test',
        cwd: '../'
    }, function (baseurl, orga, appName, api) {
        t.ok(baseurl === 'http://localhost', 'baseurl is not set correctly');
        t.ok(orga === 'mway', 'orga is not set correctly');
        t.ok(appName === 'MyTestApp', 'appName is not set correctly');
        t.ok(api === '/api/dataSync', 'api is not set correctly');

        request.get.restore();
        t.end();
    });

});
