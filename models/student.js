'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    chat_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    info: DataTypes.JSONB,
    meta: DataTypes.JSONB
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};
