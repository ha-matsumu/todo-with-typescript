const faker = require("faker");
const { sequelize } = require("../../../src/models");
const requestHelper = require("../requestHelper");

describe("Test of todo.router.js", () => {
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

  describe("GET /todos/", () => {
    it("リクエストの挙動確認 200", async () => {
      const { body } = await requestHelper
        .requestAPI("post", "/users/login", 200)
        .set("Accept", "application/json")
        .send(demoUser);

      const token = body.token;
      return requestHelper
        .requestAPI("get", "/todos", 200)
        .set("authorization", `Bearer ${token}`);
    });

    it("リクエストの挙動確認 403", () => {
      return requestHelper.requestAPI("get", "/todos", 403);
    });

    it("リクエストの挙動確認 404", () => {
      return requestHelper.requestAPI("get", "/todo", 404);
    });
  });

  describe("POST /todos/", () => {
    it("リクエストの挙動確認 200", async () => {
      const { body } = await requestHelper
        .requestAPI("post", "/users/login", 200)
        .set("Accept", "application/json")
        .send(demoUser);

      const token = body.token;
      return requestHelper
        .requestAPI("post", "/todos", 200)
        .set("authorization", `Bearer ${token}`);
    });

    it("リクエストの挙動確認 403", () => {
      return requestHelper.requestAPI("post", "/todos", 403);
    });

    it("リクエストの挙動確認 404", () => {
      return requestHelper.requestAPI("post", "/todo", 404);
    });
  });

  describe("PUT /todos/:id", () => {
    it("リクエストの挙動確認 200", async () => {
      const { body } = await requestHelper
        .requestAPI("post", "/users/login", 200)
        .set("Accept", "application/json")
        .send(demoUser);

      const token = body.token;
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
      const { body } = await requestHelper
        .requestAPI("post", "/users/login", 200)
        .set("Accept", "application/json")
        .send(demoUser);

      const token = body.token;
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
