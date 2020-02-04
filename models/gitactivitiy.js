'use strict';
module.exports = (sequelize, DataTypes) => {
  const GitActivitiy = sequelize.define('GitActivitiy', {
    type: DataTypes.STRING,
    meta: DataTypes.JSONB
  }, {});
  GitActivitiy.associate = function(models) {
    // associations can be defined here
  };
  return GitActivitiy;
};