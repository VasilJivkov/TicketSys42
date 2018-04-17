'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tickets = sequelize.define('Tickets', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        labels: {
            type: DataTypes.STRING,
        },
        files: {
            type: DataTypes.STRING,
        }
    }, {});
    Tickets.associate = function (models) {
        // associations can be defined here
    };
    return Tickets;
};