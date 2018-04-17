'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "owner" from table "Projects"
 * addColumn "ownerId" to table "Projects"
 *
 **/

var info = {
    "revision": 3,
    "name": "made",
    "created": "2018-04-17T12:31:37.858Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Projects", "owner"]
    },
    {
        fn: "addColumn",
        params: [
            "Projects",
            "ownerId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
