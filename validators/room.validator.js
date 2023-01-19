const { badResquest } = require("../utils");

const create = (req, res, next) => {
  if (!req?.body?.prize || !req?.body?.hotelId) return badResquest(req, res);
  next();
};

const readOrDeleteOrUpdate = (req, res, next) => {
  if (!req?.params.id) return badResquest(req, res);
  next();
};

module.exports = { create, readOrDeleteOrUpdate };
