const assert = require("assert");
const faker = require("faker");
const { User, Todo, sequelize } = require("../../../src/models");
const authHelper = require("../../helper/authHelper");
const requestHelper = require("../../helper/requestHelper");

describe("GET /todos", () => {
  const demoUsers = [];
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
      await authHelper.signup(demoUsers[i]);
    }
    const maxUserId = await User.max("id");
    const demoUserId = [maxUserId - 1, maxUserId];

    for (let i = 0; i < 20; i++) {
      demoTodos.push({
        title: faker.name.title(),
        desc: faker.lorem.sentences(),
        orderNumber: i + 1,
        userId: demoUserId[Math.floor(Math.random() * 2)]
      });
    }
    const promises = demoTodos.map(demoTodo => {
      Todo.create(demoTodo);
    });
    await Promise.all(promises);
  });

  after(async () => {
    await sequelize.truncate();
  });

  it("Todoの取得機能の確認(管理者の場合) 200", async () => {
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
    const signinUserID = await User.max("id");

    const { body, statusCode } = await requestHelper
      .requestAPI("get", "/todos", 200)
      .set("authorization", `Bearer ${token}`);

    const todosOfLoginUser = demoTodos.filter(demoTodo => {
      return demoTodo.userId === signinUserID;
    });

    body.forEach((todo, index) => {
      assert.equal(typeof todo.id, "number");
      assert.equal(todo.title, todosOfLoginUser[index].title);
      assert.equal(todo.desc, todosOfLoginUser[index].desc);
      assert.equal(todo.completed, false);
      assert.equal(todo.orderNumber, todosOfLoginUser[index].orderNumber);
      assert.equal(todo.userId, todosOfLoginUser[index].userId);
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
