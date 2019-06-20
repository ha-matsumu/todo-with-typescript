const requestHelper = require("../requestHelper");

describe("POST /user/signup", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("post", "/user/signup", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("post", "/user/signupabc", 404);
  });
});

describe("POST /user/signin", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("post", "/user/signin", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("post", "/user/signinabc", 404);
  });
});

describe("DELETE /user/deactivate", () => {
  it("リクエストの挙動確認 200", () => {
    return requestHelper.requestAPI("delete", "/user/deactivate", 200);
  });

  it("リクエストの挙動確認 404", () => {
    return requestHelper.requestAPI("post", "/user/deactivateabc", 404);
  });
});
