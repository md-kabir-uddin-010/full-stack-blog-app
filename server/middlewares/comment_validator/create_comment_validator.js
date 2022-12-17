const {
  comment_schema,
} = require("../../utils/validation_schema/comment_validation");

const create_comment_validator = async (req, res, next) => {
  try {
    const result = await comment_schema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = create_comment_validator;
