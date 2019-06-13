"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoUsers = [];
    for (let i = 1; i <= 10; i++) {
      demoUsers.push({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    }
    console.log(demoUsers);
    return queryInterface.bulkInsert("Users", demoUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
