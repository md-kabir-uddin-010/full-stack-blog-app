const uploader = require("../../utils/uploader/singelFile");

const profilePic = async (req, res, next) => {
  const upload = uploader(
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    10000000,
    " Only jpeg , jpg, png, webp file allow ?"
  );
  await upload.any()(req, res, (err) => {
    if (err) {
      res.status(406).json({
        errors: {
          status: 406,
          message: err.message,
        },
      });
      return;
    } else {
      next();
    }
  });
};

module.exports = profilePic;
