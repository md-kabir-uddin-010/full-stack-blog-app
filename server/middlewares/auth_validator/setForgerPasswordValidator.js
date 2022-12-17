const {
  set_forgeted_password_shema,
} = require("../../utils/validation_schema/auth_validation");

const setForgerPasswordValidator = async (req, res, next) => {
  try {
    const result = await set_forgeted_password_shema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = setForgerPasswordValidator;
