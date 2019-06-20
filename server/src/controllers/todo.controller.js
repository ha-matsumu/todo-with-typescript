const todoContrller = {
  // 各リクエストに対して実行されるメソッドを定義
  getTodos(req, res) {
    res.status(200).send("get todos from DB");
  },
  postTodos(req, res) {
    res.status(200).send("create todo to DB");
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
