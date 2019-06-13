"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Todos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      statusCode: {
        type: "TINYINT",
        allowNull: false,
        defaultValue: 0
      },
      orderNumber: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
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
    return queryInterface.dropTable("Todos");
  }
};
