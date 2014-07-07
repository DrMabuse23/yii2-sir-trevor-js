var path = require('path');
var fs = require('fs');
var notSupported = require('./notSupported');
var promzard = require('promzard');

module.exports = function(){
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
    }
};