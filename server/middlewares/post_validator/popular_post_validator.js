const {
  popular_schema,
} = require("../../utils/validation_schema/post_validation");

const popular_post_validator = async (req, res, next) => {
  try {
    const result = await popular_schema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = popular_post_validator;
