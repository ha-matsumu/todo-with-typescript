const express = require("express");
const userRouter = require("./routes/user.router");
const todoRouter = require("./routes/todo.router");
const verifyToken = require("./middlewares/authHelper");
const error = require("./middlewares/errorHelper");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use("/todos", verifyToken, todoRouter);

app.use(error.errorNotFound);
app.use(error.errorHandler);

module.exports = app;
