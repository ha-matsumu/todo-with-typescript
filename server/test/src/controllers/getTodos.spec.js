const assert = require("assert");
const faker = require("faker");
const { sequelize } = require("../../../src/models");
const authHelper = require("../../helper/authHelper");
const todoHelper = require("../../helper/todoHelper");
const requestHelper = require("../../helper/requestHelper");

describe("GET /todos", () => {
  const demoUsers = [];
  const signedUpUsers = [];
  const demoTodos = [];

  before(async () => {
    for (let i = 0; i < 2; i++) {
      //demoUsers[0]: 管理者, demoUsers[1]; 一般ユーザー
      demoUsers.push({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        userRoleId: i + 1
      });
      signedUpUsers.push(await authHelper.signup(demoUsers[i]));
    }
    for (let i = 0; i < 20; i++) {
      demoTodos.push(await todoHelper.createTodo(signedUpUsers[i % 2].id));
    }
  });

  after(async () => {
    await sequelize.truncate();
  });

  it("Todoの取得機能の確認(管理者の場合) 200", async () => {
    demoTodos.sort((todo1, todo2) => {
      return todo1.orderNumber < todo2.orderNumber ? -1 : 1;
    });

    const token = await authHelper.getToken(demoUsers[0]);
    const { body, statusCode } = await requestHelper
      .requestAPI("get", "/todos", 200)
      .set("authorization", `Bearer ${token}`);

    body.forEach((todo, index) => {
      assert.equal(typeof todo.id, "number");
      assert.equal(todo.title, demoTodos[index].title);
      assert.equal(todo.desc, demoTodos[index].desc);
      assert.equal(todo.completed, false);
      assert.equal(todo.orderNumber, demoTodos[index].orderNumber);
      assert.equal(todo.userId, demoTodos[index].userId);
      assert.equal(statusCode, 200);
    });
  });

  it("Todoの取得機能の確認(一般ユーザーの場合) 200", async () => {
    const token = await authHelper.getToken(demoUsers[1]);

    const { body, statusCode } = await requestHelper
      .requestAPI("get", "/todos", 200)
      .set("authorization", `Bearer ${token}`);

    const TodosOfLoginUser = demoTodos.filter(demoTodo => {
      return demoTodo.userId === signedUpUsers[1].id;
    });

    body.forEach((todo, index) => {
      assert.equal(typeof todo.id, "number");
      assert.equal(todo.title, TodosOfLoginUser[index].title);
      assert.equal(todo.desc, TodosOfLoginUser[index].desc);
      assert.equal(todo.completed, false);
      assert.equal(todo.orderNumber, TodosOfLoginUser[index].orderNumber);
      assert.equal(todo.userId, TodosOfLoginUser[index].userId);
      assert.equal(statusCode, 200);
    });
  });

  it("Todoの取得機能の確認 401", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("get", "/todos", 401)
      .set("authorization", "Bearer token");

    assert.equal(body.error, "Unauthorized");
    assert.equal(body.message, "Invalid token.");
    assert.equal(statusCode, 401);
  });

  it("Todoの取得機能の確認 403", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("get", "/todos", 403)
      .set("Accept", "application/json");

    assert.equal(body.error, "Forbidden");
    assert.equal(body.message, "No token provided.");
    assert.equal(statusCode, 403);
  });

  it("Todoの取得機能の確認 404", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("get", "/todo", 404)
      .set("Accept", "application/json");

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "This page could not be found.");
    assert.equal(statusCode, 404);
  });
});
