const {
  change_password_schema,
} = require("../../utils/validation_schema/auth_validation");

const changePasswordValidator = async (req, res, next) => {
  try {
    const result = await change_password_schema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = changePasswordValidator;
