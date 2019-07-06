const assert = require("power-assert");
const faker = require("faker");
const { sequelize } = require("../../../src/models");
const requestHelper = require("../requestHelper");

describe("POST /users/login", () => {
  const demoUser = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  before(async () => {
    await requestHelper
      .requestAPI("post", "/users", 200)
      .set("Accept", "application/json")
      .send(demoUser);
  });

  after(async () => {
    await sequelize.truncate();
  });

  it("ログイン機能の確認 200", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/users/login", 200)
      .set("Accept", "application/json")
      .send(demoUser);

    assert.equal(body.message, "Authentication successfully finished.");
    assert.equal(typeof body.token, "string");
    assert.equal(statusCode, 200);
  });

  it("登録されていないemailでログイン動作確認 400", async () => {
    const testData = [
      { email: "test@test.com", password: "test1234" },
      { email: "", password: "test1234" },
      { email: "", password: "" }
    ];

    const promises = testData.map(data => {
      return requestHelper
        .requestAPI("post", "/users/login", 400)
        .set("Accept", "application/json")
        .send(data);
    });
    const responses = await Promise.all(promises);

    responses.forEach(({ body, statusCode }) => {
      assert.equal(body.error, "Bad Request");
      assert.equal(body.message, "Authentication failed. User not found.");
      assert.equal(statusCode, 400);
    });
  });

  it("登録されていないパスワードでログイン動作確認 400", async () => {
    const testData = [
      { email: demoUser.email, password: "test1234" },
      { email: demoUser.email, password: "" },
      { email: demoUser.email, password: "" }
    ];

    const promises = testData.map(data => {
      return requestHelper
        .requestAPI("post", "/users/login", 400)
        .set("Accept", "application/json")
        .send(data);
    });
    const responses = await Promise.all(promises);

    responses.forEach(({ body, statusCode }) => {
      assert.equal(body.error, "Bad Request");
      assert.equal(body.message, "Authentication failed. Wrong password.");
      assert.equal(statusCode, 400);
    });
  });

  it("ログイン機能の確認 404", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/users/signin", 404)
      .set("Accept", "application/json");

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "This page could not be found.");
    assert.equal(statusCode, 404);
  });

  it("ログイン機能の確認 500", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("post", "/users/login", 500)
      .set("Accept", "application/json");

    assert.equal(body.error, "Internal Server Error");
    assert.equal(body.message, "Sorry, our service is temporaily unavailable.");
    assert.equal(statusCode, 500);
  });
});
