'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.addColumn('Students', 'user_id', {type: Sequelize.STRING})
    await queryInterface.addIndex('Students', ['user_id', 'chat_id'], {unique: true, name: 'students_chat_user_id'})
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.removeIndex('Students', 'students_chat_user_id')
    await queryInterface.removeColumn('Students', 'user_id')
  }
};
