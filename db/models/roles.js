'use strict';
module.exports = (sequelize, DataTypes) => {
    var Roles = sequelize.define('Roles', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Roles.associate = function (models) {
        // associations can be defined here
    };
    return Roles;
};