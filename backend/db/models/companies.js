'use strict';
module.exports = (sequelize, DataTypes) => {
    var Companies = sequelize.define('Companies', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {});
    Companies.associate = function (models) {
        // associations can be defined here
        const {
            Tickets,
            Projects,
            Comments,
            Companies,
            Logs,
            Notifications,
            Users,
            Labels
        } = models;

        Tickets.belongsTo(Projects, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Tickets.belongsTo(Users, {
            as: 'assignee',
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE',
        });
        Tickets.belongsTo(Users, {
            as: 'requester',
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE',
        });
        Tickets.belongsToMany(Labels, {
            through: 'ticketLabels',
        });
        Projects.belongsTo(Companies, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Projects.belongsTo(Users, {
            as: 'owner',
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE',
        });
        Logs.belongsTo(Companies, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Notifications.belongsToMany(Users, {
            through: 'usersNotifications',
        });
        Users.belongsToMany(Projects, {
            through: 'usersProjects',
        });
        Users.belongsTo(Companies, {
            onDelete: 'CASCADE'
        });
        Comments.belongsTo(Users, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Comments.belongsTo(Projects, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };
    return Companies;
};