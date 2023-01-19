const includeHandler = require("./includeHandler");

const query = (req) => {
  if (req.body._query != undefined) {
    result = {};
    const _query = req.body._query;
    result.attributes =
      _query.attributes != undefined ? _query.attributes : { exclude: [] };
    result.include =
      _query.include != undefined
        ? includeHandler(_query.include[0], _query.include[1])
        : [];
    result.order = _query.order != undefined ? _query.order : [];
    result.where = _query.where != undefined ? _query.where : [];
    result.offset = _query.offset != undefined ? _query.offset : 0;
    result.limit = _query.limit != undefined ? _query.limit : 20;

    // console.log("result in body", result);
    return result;
  }

  if (req.query._query != undefined) {
    result = {};
    // console.log("_query", JSON.parse(req.query._query))
    const _query = JSON.parse(req.query._query);
    result.attributes =
      _query.attributes != undefined ? _query.attributes : { exclude: [] };
    result.include =
      _query.include != undefined
        ? includeHandler(_query.include[0], _query.include[1])
        : [];
    result.order = _query.order != undefined ? _query.order : [];
    result.where = _query.where != undefined ? _query.where : [];
    result.offset = _query.offset != undefined ? _query.offset : 0;
    result.limit = _query.limit != undefined ? _query.limit : 20;
    return result;
  }
};
module.exports = query;
