'use strict';
module.exports = (sequelize, DataTypes) => {
    var Notifications = sequelize.define('Notifications', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Notifications.associate = function (models) {
        // associations can be defined here
    };
    return Notifications;
};