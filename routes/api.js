const express = require("express");
const router = express.Router();

// controllers
const userController = require("../controllers/user.controller");
const roomController = require("../controllers/room.controller");
const hotelController = require("../controllers/hotel.controller");
const reservationController = require("../controllers/reservation.controller");

// validators
const userValidator = require("../validators/user.validator");
const roomValidator = require("../validators/room.validator");
const hotelValidator = require("../validators/hotel.validator");
const reservationValidator = require("../validators/reservation.validator");

// users routes
router
  .route("/users")
  .post(userValidator.create, userController.create)
  .get(userController.reads);
router
  .route("/users/:id")
  .get(userValidator.readOrDeleteOrUpdate, userController.read)
  .put(userValidator.readOrDeleteOrUpdate, userController.update)
  .delete(userValidator.readOrDeleteOrUpdate, userController._delete);

// rooms routes
router
  .route("/rooms")
  .post(roomValidator.create, roomController.create)
  .get(roomController.reads);
router
  .route("/rooms/:id")
  .get(roomValidator.readOrDeleteOrUpdate, roomController.read)
  .put(roomValidator.readOrDeleteOrUpdate, roomController.update)
  .delete(roomValidator.readOrDeleteOrUpdate, roomController._delete);

// hotels routes
router
  .route("/hotels")
  .post(hotelValidator.create, hotelController.create)
  .get(hotelController.reads);
router
  .route("/hotels/:id")
  .get(hotelValidator.readOrDeleteOrUpdate, hotelController.read)
  .put(hotelValidator.readOrDeleteOrUpdate, hotelController.update)
  .delete(hotelValidator.readOrDeleteOrUpdate, hotelController._delete);

// reservations routes
router
  .route("/reservations")
  .post(reservationValidator.create, reservationController.create)
  .get(reservationController.reads);
router
  .route("/reservations/:id")
  .get(reservationValidator.readOrDeleteOrUpdate, reservationController.read)
  .put(reservationValidator.readOrDeleteOrUpdate, reservationController.update)
  .delete(
    reservationValidator.readOrDeleteOrUpdate,
    reservationController._delete
  );

module.exports = router;
