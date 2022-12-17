const {
  post_schema,
} = require("../../utils/validation_schema/post_validation");

const post_validtator = async (req, res, next) => {
  try {
    const result = await post_schema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = post_validtator;
