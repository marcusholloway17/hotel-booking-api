const models = require("../models");
const { error, custom, notFound, translate, success } = require("../utils");
const query = require("../utils/queries/handleQuery");

const create = async (req, res) => {
  try {
    const user = await models.User.create(req?.body);
    return custom(
      res,
      201,
      true,
      user,
      translate(req, "successfull_operation")
    );
  } catch (err) {
    return error(res, err);
  }
};

const update = async (req, res) => {
  try {
    const user = await models.User.findByPk(req?.params?.id);
    if (!user) return notFound(req, res);
    await user.update(req?.body);
    return custom(
      res,
      200,
      true,
      user,
      translate(req, "successfull_operation")
    );
  } catch (err) {
    return error(res, err);
  }
};

const read = async (req, res) => {
  try {
    const user = await models.User.findByPk(req?.params?.id, query(req));
    return !user ? notFound(req, res) : custom(res, 200, true, user, null);
  } catch (err) {
    return error(res, err);
  }
};

const reads = async (req, res) => {
  try {
    const users = await models.User.findAll(query(req));
    return custom(res, 200, true, users, null);
  } catch (err) {
    return error(res, err);
  }
};

const _delete = async (req, res) => {
  try {
    const user = await models.User.findByPk(req?.params?.id);
    if (!user) return notFound(req, res);
    await user.destroy();
    return success(req, res);
  } catch (err) {
    return error(res, err);
  }
};

module.exports = { create, update, _delete, read, reads };
