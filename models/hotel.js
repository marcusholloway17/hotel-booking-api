"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Room, { foreignKey: "hotelId" });
    }
  }
  Hotel.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Hotel",
    }
  );
  return Hotel;
};
