const boom = require("boom");
const { Todo, sequelize } = require("../models");

const todoContrller = {
  // 各リクエストに対して実行されるメソッドを定義
  getTodos(req, res) {
    res.status(200).send("get todos from DB");
  },

  async postTodo(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const todo = await Todo.create(
        {
          title: req.body.title,
          desc: req.body.desc,
          orderNumber: req.body.orderNumber,
          userId: req.decoded.id
        },
        { transaction }
      );
      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();

      // 500 Internal Server Error
      error = boom.boomify(error);
      error.output.payload.message =
        "Sorry, our service is temporaily unavailable.";

      next(error);
    }
  },
  putTodo(req, res) {
    const id = req.params.id;
    const data = "update todo of id " + id + " in DB";
    res.status(200).send(data);
  },
  deleteTodo(req, res) {
    const id = req.params.id;
    const data = "delete todo of id " + id + " from DB";
    res.status(200).send(data);
  }
};

module.exports = todoContrller;
