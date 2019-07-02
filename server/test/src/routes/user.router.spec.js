const requestHelper = require("../requestHelper");

describe("DELETE /user/", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("delete", "/users", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("delete", "/user", 404);
  });
});
