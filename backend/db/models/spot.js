'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
      Spot.hasMany(models.Review,  {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true});
      Spot.hasMany(models.SpotImage,  {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true});
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: DataTypes.FLOAT,
    ing: DataTypes.FLOAT,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
