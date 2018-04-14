'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employees = sequelize.define('Employees', {}, {});
  Employees.associate = function(models) {
    // associations can be defined here
  };
  return Employees;
};