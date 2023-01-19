"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Reservation.belongsTo(models.Room, {
        foreignKey: "roomId",
        onDelete: "cascade",
      });
    }
  }
  Reservation.init(
    {
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      number_of_person: DataTypes.INTEGER,
      check_in: DataTypes.DATE,
      checkout: DataTypes.DATE,
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
