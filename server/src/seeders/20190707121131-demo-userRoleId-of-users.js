"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const ids = [];
    for (let i = 1; i <= 10; i++) {
      ids.push(Math.ceil(Math.random() * 2));
    }

    const promises = ids.map(id => {
      const userRoleId = id;

      return queryInterface.bulkUpdate("Users", { userRoleId }, { id });
    });

    return Promise.all(promises);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Users", { userRoleId: null }, {});
  }
};
