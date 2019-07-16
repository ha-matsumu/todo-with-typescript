const faker = require("faker");
const { Todo } = require("../../src/models");

module.exports = {
  createTodo: userId => {
    const demoTodo = {
      title: faker.name.title(),
      desc: faker.lorem.sentences(),
      orderNumber: faker.random.number(),
      userId: userId
    };
    return Todo.create(demoTodo);
  },

  getTodos: () => {
    return Todo.findAll({
      order: [["id", "ASC"]]
    });
  }
};
