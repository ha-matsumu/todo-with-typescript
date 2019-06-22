"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "statusCode");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "statusCode", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  }
};
