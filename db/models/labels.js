'use strict';
module.exports = (sequelize, DataTypes) => {
    var Labels = sequelize.define('Labels', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Labels.associate = function (models) {
        // associations can be defined here
    };
    return Labels;
};