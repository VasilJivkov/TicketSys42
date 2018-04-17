'use strict';
module.exports = (sequelize, DataTypes) => {
    var Companies = sequelize.define('Companies', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Companies.associate = function (models) {
        // associations can be defined here
        const {
            Tickets,
            Projects,
            Companies,
            Logs,
            Notifications,
            Users,
            Labels
        } = models;

        Tickets.belongsTo(Projects);
        Tickets.belongsTo(Users, {
            as: 'assignee',
        })
        Tickets.belongsTo(Users, {
            as: 'requester',
        })
        Tickets.belongsToMany(Labels, {
            through: 'ticketLabels',
        })
        Projects.belongsTo(Companies);
        Projects.belongsTo(Users, {as: 'owner'})
        Logs.belongsTo(Companies);
        Notifications.belongsToMany(Users, {
            through: 'usersNotifications'
        });
        Users.belongsToMany(Projects, {
            through: 'usersProjects'
        });
    };
    return Companies;
};