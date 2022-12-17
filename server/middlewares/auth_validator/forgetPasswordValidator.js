const {
  forget_password_shema,
} = require("../../utils/validation_schema/auth_validation");

const forgetPasswordValidator = async (req, res, next) => {
  try {
    const result = await forget_password_shema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = forgetPasswordValidator;
