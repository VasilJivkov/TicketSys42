'use strict';
module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        nickname: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Users.associate = function (models) {
        // associations can be defined here
    };
    return Users;
};