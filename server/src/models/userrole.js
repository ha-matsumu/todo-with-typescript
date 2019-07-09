"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      privilege: DataTypes.STRING
    },
    {}
  );
  UserRole.associate = function(models) {
    UserRole.hasMany(models.User, {
      foreignKey: "userRoleId"
    });
  };
  return UserRole;
};
