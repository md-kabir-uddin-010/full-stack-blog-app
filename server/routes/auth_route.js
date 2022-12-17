const router = require("express").Router();
const {
  signupController,
  loginController,
  OTPVerifyController,
  loginOTPVerifyController,
  resendOTPController,
  deleteUserController,
  logoutController,
  refreshTokeController,
  changePasswordController,
  forgetPasswordController,
  setForgetedPasswordController,
} = require("../controllers/auth_controller");
const changePasswordValidator = require("../middlewares/auth_validator/changePasswordValidator");
const deleteUserValidator = require("../middlewares/auth_validator/deleteUserValidator");
const forgetPasswordValidator = require("../middlewares/auth_validator/forgetPasswordValidator");
const loginValidator = require("../middlewares/auth_validator/loginValidator");
const otpValidator = require("../middlewares/auth_validator/otpValidator");
const refreshTokenValidator = require("../middlewares/auth_validator/refreshTokenValidator");
const setForgerPasswordValidator = require("../middlewares/auth_validator/setForgerPasswordValidator");
const signupValidator = require("../middlewares/auth_validator/signupValidator");
const accesTokenVerify = require("../middlewares/verify_token/accesTokenVerify");
const refreshTokenVerify = require("../middlewares/verify_token/refreshTokenVerify");

router.post("/user/signup", signupValidator, signupController);

router.post("/user/login", loginValidator, loginController);

router.post("/user/account/verify/otp", otpValidator, OTPVerifyController);

router.post("/user/login/verify/otp", otpValidator, loginOTPVerifyController);

router.post("/user/resend/otp", loginValidator, resendOTPController);

router.post(
  "/user/token/refresh",
  refreshTokenValidator,
  refreshTokenVerify,
  refreshTokeController
);

router.post(
  "/user/account/delete",
  accesTokenVerify,
  deleteUserValidator,
  refreshTokenVerify,
  deleteUserController
);

router.post(
  "/user/logout",
  accesTokenVerify,
  refreshTokenValidator,
  refreshTokenVerify,
  logoutController
);
router.put(
  "/user/password/change",
  accesTokenVerify,
  changePasswordValidator,
  refreshTokenVerify,
  changePasswordController
);

router.post(
  "/user/forget/password",
  forgetPasswordValidator,
  forgetPasswordController
);
router.post(
  "/user/set/forgeted/password",
  setForgerPasswordValidator,
  setForgetedPasswordController
);

module.exports = router;
