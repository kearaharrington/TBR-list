'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookTbrLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tbrListId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tbrLists',
          key: 'id'
        }
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookTbrLists');
  }
};