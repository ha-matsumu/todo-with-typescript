const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../models");
const boom = require("boom");
const key = require("../key");

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

  async signin(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      const isMatch = await user.authenticate(req.body.password);
      if (!isMatch) {
        // 400 Bad Request
        next(boom.badRequest("Authentication failed. Wrong password."));
        return;
      }

      const token = jwt.sign(user.dataValues, key.tokenKey, {
        expiresIn: "24h"
      });
      res.status(200).json({
        message: "Authentication successfully finished.",
        token: token
      });
    } catch (error) {
      if (error instanceof TypeError) {
        // 400 Bad Request
        error = boom.badRequest("Authentication failed. User not found.");
      } else {
        // 500 Internal Server Error
        error = boom.boomify(error);
        error.output.payload.message =
          "Sorry, our service is temporaily unavailable.";
      }

      next(error);
    }
  },

  deactivate(req, res) {
    res.status(200).send("deactivate process");
  }
};

module.exports = userController;
