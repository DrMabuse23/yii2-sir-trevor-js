module.exports = {
    'name': prompt('Name', ''),
    'description': prompt('Description', ''),
    'connector': prompt('Connector', ''),
    'protocol': prompt('Protocol', ''),
    'properties': {
        'descriptorUrl': prompt('Descriptor URL', ''),
        'userName': prompt('User name', ''),
        'password': prompt('Password', ''),
        'messageSuffix': prompt('Messagesuffix', ''),
        'soapVersion': prompt('SOAP Version', ''),
        'adressingFeautre': prompt('Addressing Feature', ''),
        'mtomFeature': prompt('MTOM Feature', ''),
        'oauthProviderType': prompt('OAuth Provider Type', '')
    }
};

/*
var example = {
    "name": "",
    "description": "",
    "connector": "",
    "protocol": "",
    "properties": {
        "descriptorUrl": "",
        "userName": "",
        "password": "",
        "messageSuffix": "",
        "soapVersion": "",
        "adressingFeautre": "",
        "mtomFeature": "",
        "oauthProviderType": ""
    }
};
*/