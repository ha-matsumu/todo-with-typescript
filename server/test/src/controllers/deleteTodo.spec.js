const assert = require("assert");
const faker = require("faker");
const { sequelize } = require("../../../src/models");
const authHelper = require("../../helper/authHelper");
const todoHelper = require("../../helper/todoHelper");
const requestHelper = require("../../helper/requestHelper");

describe("DELETE /todos/:id", () => {
  const demoUsers = [];
  const signedUpUsers = [];

  before(async () => {
    for (let i = 0; i < 2; i++) {
      //demoUsers[0]: 管理者, demoUsers[1]; 一般ユーザー
      demoUsers.push({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        userRoleId: i + 1
      });
      const signedUpUser = await authHelper.signup(demoUsers[i]);
      signedUpUsers.push(signedUpUser);
    }
  });

  after(async () => {
    await sequelize.truncate();
  });

  it("Todoの削除機能の確認(管理ユーザーの場合) 200", async () => {
    for (let i = 0; i < 2; i++) {
      await todoHelper.createTodo(signedUpUsers[i].id);
    }

    const createdTodos = await todoHelper.getTodos();

    const token = await authHelper.getToken(demoUsers[0]);
    const promises = createdTodos.map(({ id }) => {
      return requestHelper
        .requestAPI("delete", `/todos/${id}`, 200)
        .set("authorization", `Bearer ${token}`);
    });
    const responses = await Promise.all(promises);

    responses.forEach(({ body, statusCode }, index) => {
      assert.equal(typeof body.id, "number");
      assert.equal(body.title, createdTodos[index].title);
      assert.equal(body.desc, createdTodos[index].desc);
      assert.equal(body.completed, createdTodos[index].completed);
      assert.equal(body.orderNumber, createdTodos[index].orderNumber);
      assert.equal(body.userId, signedUpUsers[index].id);
      assert.notEqual(body.deletedAt, null);
      assert.equal(statusCode, 200);
    });
  });

  it("Todoの削除機能の確認(一般ユーザーの場合) 200", async () => {
    const token = await authHelper.getToken(demoUsers[1]);
    await todoHelper.createTodo(signedUpUsers[1].id);

    const createdTodo = await todoHelper.getTodos();

    const { body, statusCode } = await requestHelper
      .requestAPI("delete", `/todos/${createdTodo[0].id}`, 200)
      .set("authorization", `Bearer ${token}`);

    assert.equal(typeof body.id, "number");
    assert.equal(body.title, createdTodo[0].title);
    assert.equal(body.desc, createdTodo[0].desc);
    assert.equal(body.completed, createdTodo[0].completed);
    assert.equal(body.orderNumber, createdTodo[0].orderNumber);
    assert.equal(body.userId, signedUpUsers[1].id);
    assert.notEqual(body.deletedAt, null);
    assert.equal(statusCode, 200);
  });

  it("Todoの削除機能の確認(一般ユーザーで他のユーザーのTodoを削除しようとした場合) 403", async () => {
    const token = await authHelper.getToken(demoUsers[1]);
    const createdTodo = await todoHelper.createTodo(signedUpUsers[0].id);

    const { body, statusCode } = await requestHelper
      .requestAPI("delete", `/todos/${createdTodo.id}`, 403)
      .set("authorization", `Bearer ${token}`);

    assert.equal(body.error, "Forbidden");
    assert.equal(body.message, "You don't have permission to access.");
    assert.equal(statusCode, 403);
  });

  it("Todoの削除機能の確認(ログインせずにTodoを削除しようとした場合) 403", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", "/todos/1", 403)
      .set("Accept", "application/json");

    assert.equal(body.error, "Forbidden");
    assert.equal(body.message, "No token provided.");
    assert.equal(statusCode, 403);
  });

  it("Todoの削除機能の確認(Todoが見つからなかった場合) 404", async () => {
    const token = await authHelper.getToken(demoUsers[1]);

    const { body, statusCode } = await requestHelper
      .requestAPI("delete", `/todos/0`, 404)
      .set("authorization", `Bearer ${token}`);

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "Todo could not be found.");
    assert.equal(statusCode, 404);
  });

  it("Todoの削除機能の確認(URLの指定間違いの場合) 404", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", "/todo/1", 404)
      .set("Accept", "application/json");

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "This page could not be found.");
    assert.equal(statusCode, 404);
  });
});
