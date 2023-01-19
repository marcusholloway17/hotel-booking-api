"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prize: {
        type: Sequelize.DOUBLE,
      },
      capacity: {
        type: Sequelize.INTEGER,
        default: 1,
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      heater: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      tv: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      other_facilities: {
        type: Sequelize.STRING,
      },
      hotelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Hotels',
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
