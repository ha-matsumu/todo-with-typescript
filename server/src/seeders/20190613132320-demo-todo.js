"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const demoTodos = [];

    // 日時のサンプルデータ作成
    const now = new Date();
    const year = now.getFullYear();
    const mon = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const nowDate =
      year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
    const sampleDate = [null, nowDate];

    for (let i = 1; i <= 50; i++) {
      demoTodos.push({
        title: faker.name.title(),
        desc: faker.lorem.sentences(),
        completed: faker.random.boolean(),
        orderNumber: i,
        userId: Math.ceil(Math.random() * 10),
        deletedAt: sampleDate[Math.floor(Math.random() * 2)]
      });
    }
    return queryInterface.bulkInsert("Todos", demoTodos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Todos", null, {});
  }
};
