"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserRoles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      privilege: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserRoles");
  }
};
