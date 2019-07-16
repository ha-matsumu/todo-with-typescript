const assert = require("assert");
const faker = require("faker");
const { User, sequelize } = require("../../../src/models");
const authHelper = require("../../helper/authHelper");
const requestHelper = require("../../helper/requestHelper");

describe("POST /todo", () => {
  after(async () => {
    await sequelize.truncate();
  });

  it("Todoの新規登録機能の確認 200", async () => {
    const demoUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userRoleId: 1
    };
    const demoTodo = {
      title: faker.name.title(),
      desc: faker.lorem.sentences(),
      orderNumber: faker.random.number()
    };

    await authHelper.signup(demoUser);
    const token = await authHelper.getToken(demoUser);
    const signinUserID = await User.max("id");

    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/todos", 200)
      .set("authorization", `Bearer ${token}`)
      .send(demoTodo);

    assert.equal(typeof body.id, "number");
    assert.equal(body.title, demoTodo.title);
    assert.equal(body.desc, demoTodo.desc);
    assert.equal(body.orderNumber, demoTodo.orderNumber);
    assert.equal(body.userId, signinUserID);
    assert.equal(statusCode, 200);
  });

  it("Todoの新規登録機能の確認 401", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/todos", 401)
      .set("authorization", "Bearer token");

    assert.equal(body.error, "Unauthorized");
    assert.equal(body.message, "Invalid token.");
    assert.equal(statusCode, 401);
  });

  it("Todoの新規登録機能の確認 403", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/todos", 403)
      .set("Accept", "application/json");

    assert.equal(body.error, "Forbidden");
    assert.equal(body.message, "No token provided.");
    assert.equal(statusCode, 403);
  });

  it("Todoの新規登録機能の確認 404", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/todo", 404)
      .set("Accept", "application/json");

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "This page could not be found.");
    assert.equal(statusCode, 404);
  });

  it("Todoの新規登録機能の確認 500", async () => {
    const demoUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userRoleId: 1
    };
    const testData = [
      { orderNumber: faker.random.number() },
      { title: faker.name.title() },
      {}
    ];

    await authHelper.signup(demoUser);
    const token = await authHelper.getToken(demoUser);

    const promises = testData.map(data => {
      return requestHelper
        .requestAPI("post", "/todos", 500)
        .set("authorization", `Bearer ${token}`)
        .send(data);
    });
    const responses = await Promise.all(promises);

    responses.forEach(({ body, statusCode }) => {
      assert.equal(body.error, "Internal Server Error");
      assert.equal(
        body.message,
        "Sorry, our service is temporaily unavailable."
      );
      assert.equal(statusCode, 500);
    });
  });
});
