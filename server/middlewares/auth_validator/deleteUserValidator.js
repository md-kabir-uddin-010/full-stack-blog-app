const {
  delete_user_varify_schema,
} = require("../../utils/validation_schema/auth_validation");

const deleteUserValidator = async (req, res, next) => {
  try {
    const result = await delete_user_varify_schema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = deleteUserValidator;
