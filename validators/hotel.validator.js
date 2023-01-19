const { badResquest } = require("../utils");

const create = (req, res, next) => {
  if (!req?.body?.name || !req?.body?.location) return badResquest(req, res);
  next();
};

const readOrDeleteOrUpdate = (req, res, next) => {
  if (!req?.params.id) return badResquest(req, res);
  next();
};

module.exports = { create, readOrDeleteOrUpdate };
