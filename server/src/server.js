const express = require("express");
const bodyparser = require("body-parser");
const userRouter = require("./routes/user.router");
const todoRouter = require("./routes/todo.router");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/user", userRouter);

app.use("/todo", todoRouter);

module.exports = app;
