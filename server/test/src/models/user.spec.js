const assert = require("power-assert");
const faker = require("faker");
const bcrypt = require("bcrypt");
const { User, sequelize } = require("../../../src/models");

describe("User model", () => {
  describe("パスワードがハッシュ化されて保存されているか確認", () => {
    const demoUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    before(async () => {
      await User.create(demoUser);
    });

    after(async () => {
      await sequelize.truncate();
    });

    it("パスワードがハッシュ化されて保存されているか確認", async () => {
      const user = await User.findOne({
        where: { email: demoUser.email }
      });

      assert.notEqual(user.password, demoUser.password);
    });
  });

  describe("autheticate(パスワード認証)の挙動確認", () => {
    const demoUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    before(async () => {
      await User.create(demoUser);
    });

    after(async () => {
      await sequelize.truncate();
    });

    it("登録されているパスワードで確認", async () => {
      const user = await User.findOne({
        where: { email: demoUser.email }
      });

      const isMatch = await user.authenticate(demoUser.password);
      assert.equal(isMatch, true);
    });

    it("登録されていないパスワードで確認", async () => {
      const user = await User.findOne({
        where: { email: demoUser.email }
      });

      const isMatch = await user.authenticate("abcd1234");
      assert.equal(isMatch, false);
    });
  });
});
