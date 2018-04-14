'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Companies", deps: []
 * createTable "Notifications", deps: []
 * createTable "Roles", deps: []
 * createTable "Users", deps: []
 * createTable "Logs", deps: [Companies]
 * createTable "Projects", deps: [Companies]
 * createTable "Tickets", deps: [Projects]
 * createTable "UsersNotifications", deps: [Notifications, Users]
 * createTable "UsersProjects", deps: [Users, Projects]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2018-04-14T14:38:16.061Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Companies",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Notifications",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "read": {
                    "type": Sequelize.BOOLEAN,
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "allowNull": false
                },
                "url": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Roles",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING
                },
                "lastName": {
                    "type": Sequelize.STRING
                },
                "nickname": {
                    "type": Sequelize.STRING
                },
                "role": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Logs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "CompanyId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Projects",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "deadline": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "owner": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "CompanyId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Tickets",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "deadline": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "requester": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "assignee": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "priority": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "labels": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "files": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "ProjectId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Projects",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "UsersNotifications",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "NotificationId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Notifications",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "UsersProjects",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "ProjectId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Projects",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
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
