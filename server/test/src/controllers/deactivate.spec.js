const assert = require("power-assert");
const faker = require("faker");
const { User, sequelize } = require("../../../src/models");
const authHelper = require("../../helper/authHelper");
const requestHelper = require("../../helper/requestHelper");

describe("Delete /users/:id", () => {
  after(async () => {
    await sequelize.truncate();
  });

  it("退会機能の確認(管理者の場合) 200", async () => {
    const demoUsers = [];
    for (let i = 0; i < 2; i++) {
      demoUsers.push({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        userRoleId: 1
      });
      await authHelper.signup(demoUsers[i]);
    }
    const token = await authHelper.getToken(demoUsers[0]);

    const signinUserID = await User.max("id");
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", `/users/${signinUserID}`, 200)
      .set("authorization", `Bearer ${token}`);

    assert.equal(body.message, "The membership withdrawal was completed.");
    assert.equal(statusCode, 200);
  });

  it("退会機能の確認(一般ユーザーの場合) 200", async () => {
    const demoUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userRoleId: 2
    };
    await authHelper.signup(demoUser);
    const token = await authHelper.getToken(demoUser);

    const signinUserID = await User.max("id");
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", `/users/${signinUserID}`, 200)
      .set("authorization", `Bearer ${token}`);

    assert.equal(body.message, "The membership withdrawal was completed.");
    assert.equal(statusCode, 200);
  });

  it("退会機能の確認 401", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", "/users/1", 401)
      .set("authorization", "Bearer token");

    assert.equal(body.error, "Unauthorized");
    assert.equal(body.message, "Invalid token.");
    assert.equal(statusCode, 401);
  });

  it("退会機能の確認(一般ユーザーで他のユーザーを退会させようとした場合) 403", async () => {
    const demoUsers = [];
    for (let i = 0; i < 2; i++) {
      demoUsers.push({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        userRoleId: 2
      });
      await authHelper.signup(demoUsers[i]);
    }
    const token = await authHelper.getToken(demoUsers[0]);

    const signinUserID = await User.max("id");
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", `/users/${signinUserID}`, 400)
      .set("authorization", `Bearer ${token}`);

    assert.equal(body.error, "Forbidden");
    assert.equal(body.message, "You dont't have permission to access.");
    assert.equal(statusCode, 403);
  });

  it("退会機能の確認(ログインせずに退会しようとした場合) 403", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", "/users/1", 403)
      .set("Accept", "application/json");

    assert.equal(body.error, "Forbidden");
    assert.equal(body.message, "No token provided.");
    assert.equal(statusCode, 403);
  });

  it("退会機能の確認 404", async () => {
    const { body, statusCode } = await requestHelper
      .requestAPI("delete", "/user/1", 404)
      .set("Accept", "application/json");

    assert.equal(body.error, "Not Found");
    assert.equal(body.message, "This page could not be found.");
    assert.equal(statusCode, 404);
  });
});
