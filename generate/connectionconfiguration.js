'use strict';

module.exports = {
    'name': prompt('Name', ''),
    'description': prompt('Description', ''),
    'configurationId': prompt('Configuration ID', ''),
    'configurationDescription': prompt('Configuration Description', ''),
    'authentication': prompt('Authentication', ''),
    'client': prompt('Client', ''),
    'user': prompt('User', ''),
    'alias': prompt('Alias', ''),
    'password': prompt('Password', ''),
    'language': prompt('Language', ''),
    'sapCookie': prompt('MySAP SSO2 cookie', ''),
    'x.509Certificate': prompt('X.509 certificate', ''),
    'externalIdData': prompt('External ID data', ''),
    'externalIdType': prompt('External ID type', ''),
    'applicationServer': prompt('Application server', ''),
    'systemNumber': prompt('System number', ''),
    'messageServer': prompt('Message server', ''),
    'messagePort': prompt('Message service/port', ''),
    'systemId': prompt('System ID', ''),
    'logonGroup': prompt('Logon group', ''),
    'gatewayServer': prompt('Gateway server', ''),
    'gatewayPort': prompt('Gateway service/port', ''),
    'sapRouterString': prompt('SAP router string', ''),
    'logonCheck': prompt('Logon check', ''),
    'logonCodepage': prompt('Logon codepage', ''),
    'logonCodepageType': prompt('Logon codepage type', ''),
    'tableParameterDeltaMngmt': prompt('Table parameter delta mngmt.', ''),
    'getSsoTicket': prompt('Get SSO ticket', ''),
    'denyInitialPwds': prompt('Deny initial pwds.', ''),
    'activeConnections': prompt('Active connections', ''),
    'idleConnections': prompt('Idle connections', ''),
    'expirationTimeout': prompt('Expiration timeout', ''),
    'expirationPeriod': prompt('Expiration period', ''),
    'queuedTimeout': prompt('Queued timeout', ''),
    'sncMode': prompt('SNC mode', ''),
    'sncPartner': prompt('SNC partner', ''),
    'sncLevel': prompt('SNC level of security', ''),
    'sncName': prompt('SNC name', ''),
    'sncLibrary': prompt('SNC library', ''),
    'sncSso': prompt('SNC SSO', ''),
    'repositoryDestination': prompt('Repository destination', ''),
    'repositoryUser': prompt('Repository user', ''),
    'repositoryPassword': prompt('Repository password', ''),
    'repositorySncMode': prompt('Repository SNC mode', ''),
    'repositoryRoundtripOptimization': prompt('Repository Roundtrip Optimization', ''),
    'properties': prompt(function (val) {
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
                'value': attr[2] || ''
            };
        });

        return res;
    }, 'Properties (key:type:value key:type:value)'),
    'factoryPid': prompt('Factory PID', ''),
    'bundleLocation': prompt('Bundle Location', '')
};
/*
var example = {
    'name': '',
    'description': '',
    'configurationId': '',
    'configurationDescription': '',
    'authentication': '',
    'client': '',
    'user': '',
    'alias': '',
    'password': '',
    'language': '',
    'sapCookie': '',
    'x.509Certificate': '',
    'externalIdData': '',
    'externalIdType': '',
    'applicationServer': '',
    'systemNumber': '',
    'messageServer': '',
    'messagePort': '',
    'systemId': '',
    'logonGroup': '',
    'gatewayServer': '',
    'gatewayPort': '',
    'sapRouterString': '',
    'logonCheck': '',
    'logonCodepage': '',
    'logonCodepageType': '',
    'tableParameterDeltaMngmt': '',
    'getSsoTicket': '',
    'denyInitialPwds': '',
    'activeConnections': '',
    'idleConnections': '',
    'expirationTimeout': '',
    'expirationPeriod': '',
    'queuedTimeout': '',
    'sncMode': '',
    'sncPartner': '',
    'sncLevel': '',
    'sncName': '',
    'sncLibrary': '',
    'sncSso': '',
    'repositoryDestination': '',
    'repositoryUser': '',
    'repositoryPassword': '',
    'repositorySncMode': '',
    'repositoryRoundtripOptimization': '',
    'properties': {
        'key': {
            'type': 'type',
            'value': 'value'
        },
        'key1': {
            'type': 'type1',
            'value': 'value1'
        }
    },
    'factoryPid': '',
    'bundleLocation': ''
};
 */
