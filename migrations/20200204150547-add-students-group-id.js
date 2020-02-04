'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.addColumn('Students', 'group_id', {type: Sequelize.INTEGER})
    await queryInterface.addIndex('Students', ['group_id'], {name: 'students_group_id'})
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.removeIndex('Students', 'students_group_id')
    await queryInterface.removeColumn('Students', 'group_id')
  }
};
