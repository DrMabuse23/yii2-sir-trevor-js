/**
 * Created by pascalbrewing on 01/10/14
 *
 */

"use strict";
var inquirer        = require('inquirer');
var serverconfig    = require('mcaprc');
var urlPattern      = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
var stringPattern   = /^[a-zA-Z\s]+$/;

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

    //console.log(JSON.stringify(program.server, null, "  "));
    switch (program.server) {
        case 'add':
            return addServer(program);
            break;
        default:
            break;
    }

}

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

module.exports = newserver;
