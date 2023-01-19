const { badResquest } = require("../utils");

const create = (req, res, next) => {
  if (
    !req?.body?.roomId ||
    !req?.body?.userId ||
    !req?.body?.check_in ||
    !req?.body?.checkout ||
    !req?.body?.amount
  )
    return badResquest(req, res);
  next();
};

const readOrDeleteOrUpdate = (req, res, next) => {
  if (!req?.params.id) return badResquest(req, res);
  next();
};

module.exports = { create, readOrDeleteOrUpdate };
