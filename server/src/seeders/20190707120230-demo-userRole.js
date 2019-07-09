"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoUserRoles = [{ privilege: "admin" }, { privilege: "user" }];
    return queryInterface.bulkInsert("UserRoles", demoUserRoles, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserRoles", null, {});
  }
};
