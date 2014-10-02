/**
 * Created by pascalbrewing on 01/10/14
 *
 */

"use strict";
var inquirer        = require('inquirer');
var serverconfig    = require('mcaprc');
var urlPattern      = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
var stringPattern   = /^[a-zA-Z\s]+$/;
var chalk           = require('chalk');
var _               = require('lodash');
/**
 * config for Addding
 * @type {*[]}
 */
var configAdd = [
    {
        type: "input",
        name: "name",
        message: "Application Name",
        validate: function (value) {
            var pass = value.match(stringPattern);
            if (pass) {
                return true;
            } else {
                return "Please enter a valid Application name";
            }
        }
    },
    {
        type: "input",
        name: "baseUrl",
        message: "Enter the project url (http://....)",
        validate: function (value) {
            var pass = value.match(urlPattern);

            if (pass) {
                return true;
            } else {
                return "Please enter a valid url";
            }
        }
    },
    {
        type: "input",
        name: "userName",
        message: "Enter your username"
    },
    {
        type: "password",
        name: "password",
        message: "Enter your Password"
    }

];

/**
 * the confirm if you wann add Y/N
 * @type {{type: string, name: string, message: string, default: boolean}[]}
 */
var configAddConfirm = [
    {
        type: "confirm",
        name: "addapp",
        message: "Wanna add the app with the following configuration ? ",
        default: true
    }
];


/**
 * start inquirer
 * @param program
 */
function newserver(program) {
    switch (program.server) {
        case 'add':
            return addServer(program);
            break;
        default:
            var result =  serverconfig.parse(program.server, program.args);
            return createOutput(result);
            break;
    }
}

/**
 * add a new JSON Object to .mcaprc
 * @param program
 */
function addServer(program) {
    inquirer.prompt(
        configAdd,
        function (answers) {
            if (answers) {
                var answerConfig            = JSON.stringify(answers, null, "  ");
                var rawAnswer               = answers;
                configAddConfirm[0].message += answerConfig;

                inquirer.prompt(
                    configAddConfirm,
                    function (answers) {
                        if(answers.addapp)
                            return serverconfig.parse(program.server, [rawAnswer.name, rawAnswer.baseUrl, rawAnswer.userName, rawAnswer.password]);
                    }
                );
            }
        }
    );
}

/**
 * get the all servers from  th mcaprc
 *
 * @param result
 */
function createOutput(result){
    if(typeof result === 'object' && Object.keys(result).length > 0){

        var keys        = _.keys(result);
        var servers     = _.remove(keys, function(key) {
            return key !== 'config' && key !== '_'?key:'';
        });

        servers.forEach(function(key){

            var inverseKeys = _.keys(result[key]);
            var message     = '';
            console.log('####################################################################');
            if(key !== 'default'){
                console.log(chalk.bgBlack(chalk.white('Server-name : '),chalk.magenta(key)));
            }else{
                console.log(chalk.bgBlack(chalk.white('Default Server-name : '),chalk.magenta(result.default)));
            }

            if(inverseKeys.length > 0){
                inverseKeys.forEach(function(subkey,count){
                    if(key !== 'default'){
                        message += chalk.bgBlack(chalk.white(inverseKeys[count]+': ',chalk.white(result[key][subkey] !== ''?result[key][subkey]:'na'))+'\n');
                    }
                });
            }
            console.log(chalk.bgBlack(message));
            console.log('####################################################################');
        });
    }
}

module.exports = newserver;
