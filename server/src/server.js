const express = require("express");
const userRouter = require("./routes/user.router");
const authHelper = require("./middlewares/authHelper");
const todoRouter = require("./routes/todo.router");
const error = require("./middlewares/errorHelper");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
  "/todos",
  (req, res, next) => {
    const verifiedToken = authHelper.verifyToken(req, res);
    if (verifiedToken.isBoom) {
      return next(verifiedToken);
    }
    next();
  },
  todoRouter
);

app.use(error.errorNotFound);
app.use(error.errorHandler);

module.exports = app;
