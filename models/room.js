"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Hotel, { foreignKey: "hotelId" });
      Room.belongsToMany(models.User, { through: models.Reservation });
    }
  }
  Room.init(
    {
      prize: DataTypes.DOUBLE,
      capacity: DataTypes.INTEGER,
      wifi: DataTypes.BOOLEAN,
      heater: DataTypes.BOOLEAN,
      tv: DataTypes.BOOLEAN,
      other_facilities: DataTypes.STRING,
      hotelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Room",
    }
  );
  return Room;
};
