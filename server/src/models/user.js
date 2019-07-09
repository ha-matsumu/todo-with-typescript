"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      userRoleId: DataTypes.INTEGER
    },
    {
      paranoid: true,
      hooks: {
        // パスワードのハッシュ化
        beforeSave: async user => {
          try {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(user.password, saltRounds);
            user.password = passwordHash;
          } catch (error) {
            return error;
          }
        }
      }
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Todo, {
      foreignKey: "userId"
    });
    User.belongsTo(models.UserRole);
  };

  // パスワード認証
  User.prototype.authenticate = async function(password) {
    try {
      const match = await bcrypt.compare(password, this.password);
      return match;
    } catch (error) {
      return error;
    }
  };

  return User;
};
