'use strict';

module.exports = {
    'name': prompt('name', ''),
    'description': prompt('Description', ''),
    'connector': prompt('Connector', ''),
    'protocol': prompt('Protocol', ''),
    'properties': {
        'authentication': prompt('Authentication', ''),
        'client': prompt('Client', ''),
        'user': prompt('User', ''),
        'alias': prompt('Alias', ''),
        'password': prompt('Password', ''),
        'language': prompt('Language', ''),
        'sapCookie': prompt('MySAP SSO2 cookie', ''),
        'x.509Certificate': prompt('X.509 certificate', ''),
        'externalIdDate': prompt('External ID data', ''),
        'externalIdType': prompt('External ID type', ''),
        'programServer': prompt('Program server', ''),
        'programId': prompt('Program ID', ''),
        'rfcTrace': prompt('RFC trace', ''),
        'cpicTrace': prompt('CPIC trace', ''),
        'repositoryDestination': prompt('Repository destination', ''),
        'repositoryUser': prompt('Repository user', ''),
        'repositoryPassword': prompt('Repository password', ''),
        'repositorySncMode': prompt('Repository SNC mode', ''),
        'repositoryRoundtripOptimization': prompt('Repository Roundtrip Optimization', '')
    }
};

/*
var example = {
    'name': '',
    'description': '',
    'connector': '',
    'protocol': '',
    'properties': {
        'authentication': '',
        'client': '',
        'user': '',
        'alias': '',
        'password': '',
        'language': '',
        'sapCookie': '',
        'x.509Certificate': '',
        'externalIdDate': '',
        'externalIdType': '',
        'programServer': '',
        'programId': '',
        'rfcTrace': '',
        'cpicTrace': '',
        'repositoryDestination': '',
        'repositoryUser': '',
        'repositoryPassword': '',
        'repositorySncMode': '',
        'repositoryRoundtripOptimization': ''
    }
};
*/
