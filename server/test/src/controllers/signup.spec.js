const assert = require("power-assert");
const faker = require("faker");
const { sequelize } = require("../../../src/models");
const requestHelper = require("../requestHelper");

describe("POST /users", () => {
  const demoUser = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  after(async () => {
    await sequelize.truncate();
  });

  it("ユーザの新規登録機能の確認 200", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/users", 200)
      .set("Accept", "application/json")
      .send(demoUser);

    assert.equal(typeof body.id, "number");
    assert.equal(body.name, demoUser.name);
    assert.equal(body.email, demoUser.email);
    assert.equal(typeof body.password, "string");
    assert.equal(statusCode, 200);
  });

  it("ユーザの新規登録機能の確認 400", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/users", 400)
      .set("Accept", "application/json")
      .send(demoUser);

    assert.equal(body.error, "Bad Request");
    assert.equal(
      body.message,
      "The email you typed has already been recorded."
    );
    assert.equal(statusCode, 400);
  });

  it("ユーザの新規登録機能の確認 404", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/users/abc", 404)
      .set("Accept", "application/json");

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "This page could not be found.");
    assert.equal(statusCode, 404);
  });

  it("ユーザの新規登録機能の確認 500", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/users", 500)
      .set("Accept", "application/json");

    assert.equal(body.error, "Internal Server Error");
    assert.equal(body.message, "Sorry, our service is temporaily unavailable.");
    assert.equal(statusCode, 500);
  });
});
