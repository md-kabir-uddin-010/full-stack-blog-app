const {
  post_id_schema,
} = require("../../utils/validation_schema/post_validation");

const post_id_validator = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const result = await post_id_schema.validateAsync({ post_id });
    req.params = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = post_id_validator;
