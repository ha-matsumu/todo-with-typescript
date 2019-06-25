const { User, sequelize } = require("../models");
const boom = require("boom");

const userController = {
  async signup(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      // insert into users(name, email, pasword)
      // values(req.body.name, req.body.email, req.body.password);
      const user = await User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        },
        { transaction }
      );
      await transaction.commit();
      res.status(200).json(user);
    } catch (error) {
      await transaction.rollback();

      if (error.original.errno === 1062) {
        // 400 Bad Request
        error = boom.badRequest(
          "The email you typed has already been recorded."
        );
      } else {
        // 500 Internal Server Error
        error = boom.boomify(error);
        error.output.payload.message =
          "Sorry, our service is temporaily unavailable.";
      }

      next(error);
    }
  },

  signin(req, res) {
    res.status(200).send("signin process");
  },

  deactivate(req, res) {
    res.status(200).send("deactivate process");
  }
};

module.exports = userController;
