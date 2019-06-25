const requestHelper = require("../requestHelper");

describe("POST /user/signin", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("post", "/users/login", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("post", "/user/login", 404);
  });
});

describe("DELETE /user/deactivate", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("delete", "/users", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("post", "/user", 404);
  });
});
