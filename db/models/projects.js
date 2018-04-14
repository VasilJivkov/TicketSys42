'use strict';
module.exports = (sequelize, DataTypes) => {
    var Projects = sequelize.define('Projects', {
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
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {});
    Projects.associate = function (models) {
        // associations can be defined here
    };
    return Projects;
};