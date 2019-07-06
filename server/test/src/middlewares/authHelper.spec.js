const assert = require("power-assert");
const faker = require("faker");
const httpMocks = require("node-mocks-http");
const { sequelize } = require("../../../src/models");
const verifyToken = require("../../../src/middlewares/authHelper");
const authHelper = require("../../helper/authHelper");

describe("Test of authHelper.js", () => {
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

  it("トークン認証の動作確認 200", async () => {
    const token = await authHelper.getToken(demoUser);
    const req = httpMocks.createRequest({
      headers: { Authorization: `Bearer ${token}` }
    });
    const res = httpMocks.createResponse();
    verifyToken(req, res, () => {});

    assert.equal(req.statusCode, 200);
  });

  it("トークン認証の動作確認 401", done => {
    const req = httpMocks.createRequest({
      headers: { Authorization: `Bearer token` }
    });
    const res = httpMocks.createResponse();
    verifyToken(req, res, error => {
      const payload = error.output.payload;

      assert.equal(payload.error, "Unauthorized");
      assert.equal(payload.message, "Invalid token.");
      assert.equal(payload.statusCode, 401);
      done();
    });
  });

  it("トークン認証の動作確認 403", done => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    verifyToken(req, res, error => {
      const payload = error.output.payload;

      assert.equal(payload.error, "Forbidden");
      assert.equal(payload.message, "No token provided.");
      assert.equal(payload.statusCode, 403);
      done();
    });
  });
});
