const models = require("../../models");

const User = {
  model: models.User,
};

const Hotel = {
  model: models.Hotel,
};

const Room = {
  model: models.Room,
};

const Reservation = {
  model: models.Reservation,
};

module.exports = {
  User,
  Hotel,
  Room,
  Reservation,
};
