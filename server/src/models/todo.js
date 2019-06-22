"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      orderNumber: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    { paranoid: true }
  );
  Todo.associate = function(models) {
    Todo.belongsTo(models.User);
  };
  return Todo;
};
