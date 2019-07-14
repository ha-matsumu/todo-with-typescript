const faker = require("faker");
const { sequelize } = require("../../../src/models");
const authHelper = require("../../helper/authHelper");
const requestHelper = require("../../helper/requestHelper");

describe("Test of todo.router.js", () => {
  const demoUser = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  before(async () => {
    await authHelper.signup(demoUser);
  });

  after(async () => {
    await sequelize.truncate();
  });

  describe("PUT /todos/:id", () => {
    it("リクエストの挙動確認 200", async () => {
      const token = await authHelper.getToken(demoUser);
      return requestHelper
        .requestAPI("put", "/todos/1", 200)
        .set("authorization", `Bearer ${token}`);
    });

    it("リクエストの挙動確認 403", () => {
      return requestHelper.requestAPI("put", "/todos/1", 403);
    });

    it("リクエストの挙動確認 404", () => {
      return requestHelper.requestAPI("put", "/todo/1", 404);
    });
  });

  describe("DELETE /todos/", () => {
    it("リクエストの挙動確認 200", async () => {
      const token = await authHelper.getToken(demoUser);
      return requestHelper
        .requestAPI("delete", "/todos/1", 200)
        .set("authorization", `Bearer ${token}`);
    });

    it("リクエストの挙動確認 403", () => {
      return requestHelper.requestAPI("delete", "/todos/1", 403);
    });

    it("リクエストの挙動確認 404", () => {
      return requestHelper.requestAPI("delete", "/todo/1", 404);
    });
  });
});
