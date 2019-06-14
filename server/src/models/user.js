"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      statusCode: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeSave: hashPasswordHook
      }
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Todo, {
      foreignKey: "userId"
    });
  };

  // パスワードをハッシュ化
  const hashPasswordHook = async user => {
    try {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(user.password, saltRounds);
      user.password = passwordHash;
    } catch (error) {
      return error;
    }
  };

  // パスワードのチェック
  User.prototype.checkPassword = async password => {
    try {
      const match = await bcrypt.compare(password, this.password);
      return match;
    } catch (error) {
      return error;
    }
  };

  return User;
};
