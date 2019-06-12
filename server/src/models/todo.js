"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      statusCode: DataTypes.INTEGER,
      orderNumber: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };
  return Todo;
};
