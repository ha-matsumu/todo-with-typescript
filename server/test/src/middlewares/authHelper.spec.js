const assert = require("power-assert");
const faker = require("faker");
const httpMocks = require("node-mocks-http");
const { sequelize } = require("../../../src/models");
const authHelper = require("../../../src/middlewares/authHelper");
const requestHelper = require("../requestHelper");

describe("Test of authHelper.js", () => {
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

  it("トークン認証の動作確認 200", async () => {
    const { body } = await requestHelper
      .requestAPI("post", "/users/login", 200)
      .set("Accept", "application/json")
      .send(demoUser);

    const token = body.token;
    const req = httpMocks.createRequest({
      headers: { Authorization: `Bearer ${token}` }
    });

    const res = httpMocks.createResponse();
    const verifiedToken = authHelper.verifyToken(req, res);

    assert.equal(verifiedToken.statusCode, 200);
  });

  it("トークン認証の動作確認 401", async () => {
    const req = httpMocks.createRequest({
      headers: { Authorization: `Bearer token` }
    });

    const res = httpMocks.createResponse();
    const verifiedToken = authHelper.verifyToken(req, res);
    const payload = verifiedToken.output.payload;

    assert.equal(payload.error, "Unauthorized");
    assert.equal(payload.message, "Invalid token.");
    assert.equal(payload.statusCode, 401);
  });

  it("トークン認証の動作確認 403", async () => {
    const req = httpMocks.createRequest();

    const res = httpMocks.createResponse();
    const verifiedToken = authHelper.verifyToken(req, res);
    const payload = verifiedToken.output.payload;

    assert.equal(payload.error, "Forbidden");
    assert.equal(payload.message, "No token provided.");
    assert.equal(payload.statusCode, 403);
  });
});
