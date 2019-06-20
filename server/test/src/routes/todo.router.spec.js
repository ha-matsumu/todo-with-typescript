const requestHelper = require("../requestHelper");

describe("GET /todo/", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("get", "/todo/", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("get", "/todos/", 404);
  });
});

describe("POST /todo/", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("post", "/todo/", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("post", "/todos/", 404);
  });
});

describe("PUT /todo/:id", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("put", "/todo/1", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("put", "/todos/1", 404);
  });
});

describe("DELETE /todo/", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("delete", "/todo/1", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("delete", "/todos/1", 404);
  });
});
