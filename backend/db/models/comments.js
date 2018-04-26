'use strict';
module.exports = (sequelize, DataTypes) => {
    var Comments = sequelize.define('Comments', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Comments.associate = function (models) {
        // associations can be defined here
    };
    return Comments;
};