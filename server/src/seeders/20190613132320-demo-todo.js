"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoTodos = [];
    for (let i = 1; i <= 50; i++) {
      demoTodos.push({
        title: faker.name.title(),
        desc: faker.lorem.sentences(),
        completed: faker.random.boolean(),
        statusCode: Math.floor(Math.random() * 2),
        orderNumber: i,
        userId: Math.floor(Math.random() * 11)
      });
    }
    return queryInterface.bulkInsert("Todos", demoTodos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Todos", null, {});
  }
};
