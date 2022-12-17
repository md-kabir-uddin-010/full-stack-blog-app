const {
  slug_schema,
} = require("../../utils/validation_schema/post_validation");

const slug_validator = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await slug_schema.validateAsync({ slug });
    req.params = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = slug_validator;
