const request = require("supertest");
const app = require("../../src/server");

module.exports = {
  requestAPI: (method, url, statusCode) => {
    const lowerMethod = method.toLowerCase();

    return request(app)
      [lowerMethod](url)
      .expect(statusCode);
  }
};
