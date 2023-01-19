/*
 * List of all models include structure to avoid error while fetching data
 *
 */
const { User, Hotel, Room, Reservation } = require("./model");

// Hotel include
const hotelInclude = (params) => {
  const result = [];
  if (!params) return result;
  if (params.includes("room")) {
    Room.include = [];
    if (params.includes("reservation")) {
      Room.include.push(Reservation);
    }
    result.push(Room);
  }
  return result;
};

// User include
const userInclude = (params) => {
  const result = [];
  if (!params) return result;
  if (params.includes("reservation")) {
    Reservation.include = [];
    if (params.includes("room")) {
      Room.include = [];
      if (params.includes("hotel")) {
        Room.include.push(Hotel);
      }
      Reservation.include.push(Room);
    }
    result.push(Reservation);
  }
  return result;
};

// Room include
const roomInclude = (params) => {
  const result = [];
  if (!params) return result;
  if (params.includes("reservation")) {
    Room.push(Reservation);
  }
  if (params.includes("hotel")) {
    Room.push(Hotel);
  }
  return result;
};

// Reservation include
const reservationInclude = (params) => {
  const result = [];
  if (!params) return result;
  if (params.includes("user")) {
    result.push(User);
  }
  if (params.includes("room")) {
    Room.include = [];
    if (params.includes("hotel")) {
      Room.include.push(Hotel);
    }
    result.push(Room);
  }
  return result;
};

module.exports = {
  roomInclude,
  userInclude,
  hotelInclude,
  reservationInclude,
};
