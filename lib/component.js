var path = require('path');
var fs = require('fs');
var notSupported = require('./notSupported');
var promzard = require('promzard');

var generatePath = '../generate/';

function generate(program){
    if(!program) return false;
    var file = path.resolve(__dirname, generatePath + program.generate + '.js');
    if(fs.existsSync(file)){
        var ctx = { basename: path.basename(path.dirname(file)) };
        promzard(file, ctx, function (er, res) {
            if (er){
                throw er;
            }
            console.log(JSON.stringify(res, null, 2));
        });
    } else {
        notSupported();
        return false;
    }
};

function getComponentList(){
    var folder = path.resolve(__dirname, generatePath);
    var files =  fs.readdirSync(folder);
    var components = [];
    files.forEach(function(name){
        components.push(path.basename(name, '.js'));
    });
    return components;
}

module.exports.getComponentList = getComponentList;
module.exports.generate = generate;