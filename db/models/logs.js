'use strict';
module.exports = (sequelize, DataTypes) => {
    var Logs = sequelize.define('Logs', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Logs.associate = function (models) {
        // associations can be defined here
    };
    return Logs;
};