const assert = require("assert");
const faker = require("faker");
const { sequelize } = require("../../../src/models");
const authHelper = require("../../helper/authHelper");
const todoHelper = require("../../helper/todoHelper");
const requestHelper = require("../../helper/requestHelper");

describe("PUT /todos/:id", () => {
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
      signedUpUsers.push(await authHelper.signup(demoUsers[i]));
    }
  });

  after(async () => {
    await sequelize.truncate();
  });

  it("Todoの更新機能の確認(管理ユーザーの場合) 200", async () => {
    for (let i = 0; i < 2; i++) {
      await todoHelper.createTodo(signedUpUsers[i].id);
    }

    const createdTodos = await todoHelper.getTodos();
    const updatedTodo = {
      title: faker.name.title(),
      desc: faker.lorem.sentences(),
      completed: true,
      orderNumber: faker.random.number()
    };

    const token = await authHelper.getToken(demoUsers[0]);
    const promises = createdTodos.map(({ id }) => {
      return requestHelper
        .requestAPI("put", `/todos/${id}`, 200)
        .set("authorization", `Bearer ${token}`)
        .send(updatedTodo);
    });
    const responses = await Promise.all(promises);

    responses.forEach(({ body, statusCode }, index) => {
      assert.equal(typeof body.id, "number");
      assert.equal(body.title, updatedTodo.title);
      assert.equal(body.desc, updatedTodo.desc);
      assert.equal(body.completed, updatedTodo.completed);
      assert.equal(body.orderNumber, updatedTodo.orderNumber);
      assert.equal(body.userId, signedUpUsers[index].id);
      assert.equal(statusCode, 200);
    });
  });

  it("Todoの更新機能の確認(一般ユーザーの場合) 200", async () => {
    const token = await authHelper.getToken(demoUsers[1]);
    const createdTodo = await todoHelper.createTodo(signedUpUsers[1].id);

    const updatedTodo = {
      title: faker.name.title(),
      desc: faker.lorem.sentences(),
      completed: true,
      orderNumber: faker.random.number()
    };

    const { body, statusCode } = await requestHelper
      .requestAPI("put", `/todos/${createdTodo.id}`, 200)
      .set("authorization", `Bearer ${token}`)
      .send(updatedTodo);

    assert.equal(typeof body.id, "number");
    assert.equal(body.title, updatedTodo.title);
    assert.equal(body.desc, updatedTodo.desc);
    assert.equal(body.completed, updatedTodo.completed);
    assert.equal(body.orderNumber, updatedTodo.orderNumber);
    assert.equal(body.userId, signedUpUsers[1].id);
    assert.equal(statusCode, 200);
  });

  it("Todoの更新機能の確認(Todoが見つからなかった場合) 400", async () => {
    const token = await authHelper.getToken(demoUsers[1]);

    const { body, statusCode } = await requestHelper
      .requestAPI("put", `/todos/0`, 400)
      .set("authorization", `Bearer ${token}`);

    assert.equal(body.error, "Bad Request");
    assert.equal(body.message, "Todo not found.");
    assert.equal(statusCode, 400);
  });

  it("Todoの更新機能の確認(一般ユーザーで他のユーザーのTodoを更新しようとした場合) 400", async () => {
    const token = await authHelper.getToken(demoUsers[1]);
    const createdTodo = await todoHelper.createTodo(signedUpUsers[0].id);

    const { body, statusCode } = await requestHelper
      .requestAPI("put", `/todos/${createdTodo.id}`, 400)
      .set("authorization", `Bearer ${token}`);

    assert.equal(body.error, "Bad Request");
    assert.equal(body.message, "A bad request was sent.");
    assert.equal(statusCode, 400);
  });

  it("Todoの更新機能の確認 403", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("put", "/todos/1", 403)
      .set("Accept", "application/json");

    assert.equal(body.error, "Forbidden");
    assert.equal(body.message, "No token provided.");
    assert.equal(statusCode, 403);
  });

  it("Todoの更新機能の確認 404", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("put", "/todo/1", 404)
      .set("Accept", "application/json");

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "This page could not be found.");
    assert.equal(statusCode, 404);
  });
});
