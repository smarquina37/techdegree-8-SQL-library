"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {}
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "title"',
          },
          notEmpty: {
            msg: 'Please provide a value for "title"',
          },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "author"',
          },
          notEmpty: {
            msg: 'Please provide a value for "title"',
          },
        },
      },
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
