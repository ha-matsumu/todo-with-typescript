const boom = require("boom");
const { User, Todo, sequelize } = require("../models");

const todoContrller = {
  // 各リクエストに対して実行されるメソッドを定義
  async getTodos(req, res, next) {
    try {
      let todos;
      if (User.isAdmin(req.decoded.UserRoleId)) {
        todos = await Todo.findAll({
          order: [["orderNumber", "ASC"]]
        });
      } else {
        todos = await Todo.findAll({
          where: {
            userId: req.decoded.id
          },
          order: [["orderNumber", "ASC"]]
        });
      }
      res.status(200).json(todos);
    } catch (error) {
      // 500 Internal Server Error
      error = boom.boomify(error);
      error.output.payload.message =
        "Sorry, our service is temporaily unavailable.";

      next(error);
    }
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

  async putTodo(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const todo = await Todo.findByPk(req.params.id, { transaction });
      if (!todo) {
        // 404 Not Found
        throw boom.notFound("Todo could not be found.");
      }

      if (
        !User.isAdmin(req.decoded.UserRoleId) &&
        todo.userId !== req.decoded.id
      ) {
        // 403 Forbidden
        throw boom.forbidden("You don't have permission to access.");
      }

      await todo.update(
        {
          title: req.body.title,
          desc: req.body.desc,
          completed: req.body.completed,
          orderNumber: req.body.orderNumber
        },
        { transaction }
      );

      await transaction.commit();

      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();

      let _error;
      if (error.isBoom) {
        _error = error;
      } else {
        // 500 Internal Server Error
        _error = boom.boomify(error);
        _error.output.payload.message =
          "Sorry, our service is temporaily unavailable.";
      }

      next(_error);
    }
  },

  async deleteTodo(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const todo = await Todo.findByPk(req.params.id, { transaction });
      if (!todo) {
        // 404 Not Found
        throw boom.notFound("Todo could not be found.");
      }

      if (
        !User.isAdmin(req.decoded.UserRoleId) &&
        todo.userId !== req.decoded.id
      ) {
        // 403 Forbidden
        throw boom.forbidden("You don't have permission to access.");
      }

      await todo.destroy({ transaction });
      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();

      let _error;
      if (error.isBoom) {
        _error = error;
      } else {
        // 500 Internal Server Error
        _error = boom.boomify(error);
        _error.output.payload.message =
          "Sorry, our service is temporaily unavailable.";
      }

      next(_error);
    }
  }
};

module.exports = todoContrller;
