const {
  edit_profile_schema,
} = require("../../utils/validation_schema/auth_validation");

const editProfileValidation = async (req, res, next) => {
  try {
    const result = await edit_profile_schema.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    const files = req.files;
    if (files && files.length > 0) {
      files.forEach((file) => {
        unlink(
          path.join(`${__dirname}/../../../public/profile/${file.filename}`),
          (err) => {
            if (err) throw createHttpError.InternalServerError();
          }
        );
      });
    }
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = editProfileValidation;
