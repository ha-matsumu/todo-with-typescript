"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoUserRoles = [{ role: "admin" }, { role: "user" }];
    return queryInterface.bulkInsert("UserRoles", demoUserRoles, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserRoles", null, {});
  }
};
