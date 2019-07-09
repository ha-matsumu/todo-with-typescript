"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "userRoleId", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      after: "password",
      defaultValue: 2
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "userRoleId");
  }
};
