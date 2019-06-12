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
      },
      instanceMethods: {
        authenticate: checkPassword
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
      const passwordHash = await bcrypt.hash(user.password, 10);
      user.password = passwordHash;
    } catch (error) {
      return error;
    }
  };

  // パスワードのチェック
  const checkPassword = async password => {
    try {
      const match = await bcrypt.compare(password, this.password);
      return match;
    } catch (error) {
      return error;
    }
  };

  return User;
};
