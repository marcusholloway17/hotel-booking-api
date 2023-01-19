const { badResquest } = require("../utils");

const create = (req, res, next) => {
  if (
    !req?.body?.email ||
    !req?.body?.phone_number ||
    !req?.body?.firstname ||
    !req?.body?.lastname
  )
    return badResquest(req, res);
  next();
};

const readOrDeleteOrUpdate = (req, res, next) => {
  if (!req?.params.id) return badResquest(req, res);
  next();
};

module.exports = { create, readOrDeleteOrUpdate };
