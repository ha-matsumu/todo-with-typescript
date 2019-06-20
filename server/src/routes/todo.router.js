const express = require("express");
const todoController = require("../controllers/todo.controller");
const router = express.Router();

// (GET:取得 POST:新規登録)
router
  .route("/")
  .get(todoController.getTodos)
  .post(todoController.postTodos);
  
// (PUT:更新 DELETE:論理削除)
router
  .route("/:id")
  .put(todoController.putTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
