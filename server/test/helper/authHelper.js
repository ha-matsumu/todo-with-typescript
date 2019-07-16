const faker = require("faker");
const requestHelper = require("./requestHelper");

module.exports = {
  signup: async demoUser => {
    const { body } = await requestHelper
      .requestAPI("post", "/users", 200)
      .set("Accept", "application/json")
      .send(demoUser);
    return body;
  },
  getToken: async demoUser => {
    const { body } = await requestHelper
      .requestAPI("post", "/users/login", 200)
      .set("Accept", "application/json")
      .send(demoUser);
    return body.token;
  }
};
