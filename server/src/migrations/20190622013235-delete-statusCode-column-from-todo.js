"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Todos", "statusCode");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Todos", "statusCode", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  }
};
