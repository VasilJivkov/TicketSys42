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
            Users
        } = models;

        Tickets.belongsTo(Projects);
        Tickets.belongsTo(Users, {as: 'assignee'})
        Tickets.belongsTo(Users, {as: 'requester'})
        Projects.belongsTo(Companies);
        Logs.belongsTo(Companies);
        Notifications.belongsToMany(Users, {
            through: 'UsersNotifications'
        });
        Users.belongsToMany(Projects, {
            through: 'UsersProjects'
        });
    };
    return Companies;
};