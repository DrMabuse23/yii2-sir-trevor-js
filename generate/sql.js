module.exports = {
    'name': prompt("name", ""),
    'description': prompt("Description", ""),
    'connector': prompt("Connector", ""),
    'protocol': prompt("Protocol", ""),
    "properties": {
        'schema': prompt("Schema", "")
    }
};
/*
var example = {
    "name": "",
    "description": "",
    "connector": "",
    "protocol": "",
    "properties": {
        "schema": ""
    }
};

*/