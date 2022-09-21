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
      // models.book.belongsToMany(models.tbrlist, { through: user })
      // models.book.belongstoMany(models.readList, { through: User })
      models.book.hasMany(models.bookComment)
    }
  }
  book.init({
    title: DataTypes.STRING,
    authorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};