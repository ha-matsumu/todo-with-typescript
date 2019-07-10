"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      role: DataTypes.STRING
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
