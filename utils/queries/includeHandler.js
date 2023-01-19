const {
  roomInclude,
  userInclude,
  hotelInclude,
  reservationInclude,
} = require("./modelIncludes");

const includeHandler = (model, params) => {
  switch (model) {
    case "user":
      return userInclude(params);
    case "room":
      return roomInclude(params);
    case "hotel":
      return hotelInclude(params);
    case "reservation":
      return reservationInclude(params);
    default:
      return [];
  }
};

module.exports = includeHandler;
