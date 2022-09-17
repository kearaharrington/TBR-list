'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.book.belongsTo(models.author)
    }

    getBookDetails() {
      return this.title + this.author
    }
  }
  book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};