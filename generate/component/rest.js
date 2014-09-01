'use strict';

module.exports = {
    'name': prompt('Name', ''),
    'description': prompt('Description', ''),
    'connectorProvider': 'HTTP',//prompt('Connector', ''),
    'protocol': 'com.mwaysolutions.mcap.connector.http.RestConnectionConfig',//prompt('Protocol', ''),
    'properties': {
        'descriptorUrl': prompt('Descriptor URL', ''),
        'userName': prompt('User name', ''),
        'password': prompt('Password', '')
//        ,
//        'jsonMediaType': prompt('JSON Media Types', ''),
//        'xmlMediaType': prompt('XML Media Types', ''),
//        'oauthProviderType': prompt('OAuth Provider Type', '')
    }
};

/*
var example = {
    'name': '',
    'description': '',
    'connectorProvider': '',
    'protocol': '',
    'properties': {
        'descriptorUrl': '',
        'userName': '',
        'password': '',
        'jsonMediaType': '',
        'xmlMediaType': '',
        'oauthProviderType': ''
    }
};
*/
