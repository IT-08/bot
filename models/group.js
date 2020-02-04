'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
    models.Group.Students = models.Group.hasMany(
      models.Student,
      { as: 'Students', foreignKey: 'group_id' },
    );
  };
  return Group;
};