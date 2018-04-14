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
    };
    return Companies;
};