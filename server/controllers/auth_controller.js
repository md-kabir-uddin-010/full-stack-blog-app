const createHttpError = require("http-errors");
const cloudinary = require("../config/cloudinary");
const {
  findUserByEmail,
  findUserByRole,
  createNewUser,
  createNewOTP,
  matchPassword,
  createNewToken,
  findUserById,
  verifyedUser,
  deleteOtpByUserId,
  findOTPByUserId,
  findTokenByUserId,
  deleteTokenByUserId,
  deleteUserById,
  changePasswordById,
} = require("../services/auth/db_query");
const sendEmail = require("../services/mail/sendEmail");
const {
  findPorfilePicById,
  deletePorfilePicById,
} = require("../services/upload/profile_pic_query");
const { mail_body } = require("../utils/mail_body/mail_body");
const { accessToken, refreshToken } = require("../utils/sign_token/jwt_token");

//signup controller
exports.signupController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isEmailExist = await findUserByEmail(email);
    if (isEmailExist)
      throw createHttpError.Conflict(
        `${email} this email has been used once. Try with any other email`
      );

    //find admin exist or not
    const findAdmin = await findUserByRole("super_admin");
    if (findAdmin)
      throw createHttpError.Conflict(
        "Sorry, already one of the admins has been selected"
      );

    const createUser = await createNewUser({ name, email, password });
    const { id } = createUser;

    const createdOtp = await createNewOTP({ user_id: id });
    //send varification email
    const subject = `${createdOtp.dataValues.token} is the code to finish confirming your email`;
    const sitename = process.env.PUBLIC_DOMAIN;
    const otp_code = createdOtp.dataValues.token;
    const mail_name = "sign up";
    const exp_time = process.env.OTP_EXPIRATION;
    const html = mail_body(sitename, otp_code, mail_name, exp_time);

    await sendEmail(email, subject, html);

    const cloneObj = { ...createUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    res
      .status(200)
      .json({ message: "An OTP code has been sent to your email", info });
  } catch (error) {
    next(error);
  }
};
//login controller
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await findUserByEmail(email);
    if (!findUser)
      throw createHttpError.Unauthorized("Your email or password is incorrect");

    const match = await matchPassword(password, findUser.password);
    if (!match)
      throw createHttpError.Unauthorized("Your email or password is incorrect");

    //user id
    const { id } = findUser;

    const cloneObj = { ...findUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    //user not verifyed than send varification email
    if (!findUser.verifyed) {
      const createdOtp = await createNewOTP({ user_id: id });

      //send varification email
      const subject = `${createdOtp.dataValues.token} is the code to finish confirming your email`;
      const sitename = process.env.PUBLIC_DOMAIN;
      const otp_code = createdOtp.dataValues.token;
      const mail_name = "sign in";
      const exp_time = process.env.OTP_EXPIRATION;
      const html = mail_body(sitename, otp_code, mail_name, exp_time);

      await sendEmail(email, subject, html);

      return res
        .status(200)
        .json({ message: "An OTP code has been sent to your email", info });
    }

    const createdOtp = await createNewOTP({ user_id: id });
    //send varification email
    const subject = `${createdOtp.dataValues.token} is the code to finish confirming your email`;
    const sitename = process.env.PUBLIC_DOMAIN;
    const otp_code = createdOtp.dataValues.token;
    const mail_name = "sign in";
    const exp_time = process.env.OTP_EXPIRATION;
    const html = mail_body(sitename, otp_code, mail_name, exp_time);

    await sendEmail(email, subject, html);

    res
      .status(200)
      .json({ message: "An OTP code has been sent to your email", info });
  } catch (error) {
    next(error);
  }
};
//user verify by OTP
exports.OTPVerifyController = async (req, res, next) => {
  try {
    const { user_id, token } = req.body;

    const findUser = await findUserById(user_id);

    if (findUser && findUser.verifyed)
      throw createHttpError.Conflict("Your account has already been verified");

    if (!findUser) throw createHttpError.Unauthorized("No user found");

    const findOtp = await findOTPByUserId(user_id);
    if (!findOtp) throw createHttpError.Unauthorized("No user found");

    const otpIsExpired = new Date().getTime() > findOtp.dataValues.expired;
    if (otpIsExpired)
      throw createHttpError.Unauthorized("Your OTP code has expired");
    //user id

    const matchToken = Number(token) === Number(findOtp.token);
    if (!matchToken)
      throw createHttpError.Unauthorized("Your OTP code is incorrect");

    const { id } = findUser;

    const updateUser = await verifyedUser(id, true);

    //send token
    const access_token = accessToken(id);
    const refresh_token = refreshToken(id);

    //save token
    await createNewToken({ user_id: id, token: refresh_token });
    await deleteOtpByUserId(id);

    const cloneObj = { ...updateUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    res.status(200).json({
      access_token,
      refresh_token,
      info,
    });
  } catch (error) {
    next(error);
  }
};

//login user verify by OTP
exports.loginOTPVerifyController = async (req, res, next) => {
  try {
    const { user_id, token } = req.body;

    const findUser = await findUserById(user_id);

    if (findUser && !findUser.verifyed)
      throw createHttpError.Conflict("Your account was not verified");

    if (!findUser) throw createHttpError.Unauthorized("No user found");

    const findOtp = await findOTPByUserId(user_id);
    if (!findOtp) throw createHttpError.Unauthorized("No user found");

    const isExpired = new Date().getTime() > findOtp.dataValues.expired;
    if (isExpired)
      throw createHttpError.Unauthorized("Your OTP code has expired");

    //user id

    const matchToken = Number(token) === Number(findOtp.token);
    if (!matchToken)
      throw createHttpError.Unauthorized("Your OTP code is incorrect");

    const { id } = findUser;

    //send token
    const access_token = accessToken(id);
    const refresh_token = refreshToken(id);

    //save token
    await createNewToken({ user_id: id, token: refresh_token });
    await deleteOtpByUserId(id);

    const cloneObj = { ...findUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    res.status(200).json({
      access_token,
      refresh_token,
      info,
    });
  } catch (error) {
    next(error);
  }
};

//resend otp controller
exports.resendOTPController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await findUserByEmail(email);
    if (!findUser)
      throw createHttpError.Unauthorized("Your email or password is incorrect");

    const match = await matchPassword(password, findUser.password);
    if (!match)
      throw createHttpError.Unauthorized("Your email or password is incorrect");

    //user id
    const { id } = findUser;

    const cloneObj = { ...findUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    const createdOtp = await createNewOTP({ user_id: id });
    //send varification email
    const subject = `${createdOtp.dataValues.token} is the code to finish confirming your email`;
    const sitename = process.env.PUBLIC_DOMAIN;
    const otp_code = createdOtp.dataValues.token;
    const mail_name = "sign in";
    const exp_time = process.env.OTP_EXPIRATION;
    const html = mail_body(sitename, otp_code, mail_name, exp_time);

    await sendEmail(email, subject, html);

    res
      .status(200)
      .json({ message: "An OTP code has been sent to your email", info });
  } catch (error) {
    next(error);
  }
};

//refresh token
exports.refreshTokeController = async (req, res, next) => {
  try {
    const { refresh_token: token } = req.body;
    const user_id = req.user_id;

    const findUser = await findUserById(user_id);
    if (!findUser) throw createHttpError.Unauthorized("No user found");

    const findToken = await findTokenByUserId(user_id);
    if (!findToken) throw createHttpError.Unauthorized("No user found");

    const matchToken = token === findToken.token;

    if (!matchToken)
      throw createHttpError.Unauthorized("Your token is blacklisted");

    const { id } = findUser;

    //send token
    const access_token = accessToken(id);
    const refresh_token = refreshToken(id);

    //save token
    await createNewToken({ user_id: id, token: refresh_token });
    await deleteOtpByUserId(id);

    const cloneObj = { ...findUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    res.status(200).json({
      access_token,
      refresh_token,
      info,
    });
  } catch (error) {
    next(error);
  }
};

//logout
exports.logoutController = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const user_id = req.user_id;

    const findToken = await findTokenByUserId(user_id);
    if (!findToken) throw createHttpError.Unauthorized("No user found");

    const matchToken = refresh_token === findToken.token;
    if (!matchToken)
      throw createHttpError.Unauthorized("Your token is blacklisted");

    await deleteTokenByUserId(user_id);

    res.status(200).json({ message: "logout successfull" });
  } catch (error) {
    next(error);
  }
};

//delete account
exports.deleteUserController = async (req, res, next) => {
  try {
    const { refresh_token, password } = req.body;
    const user_id = req.user_id;

    const findUser = await findUserById(user_id);
    if (!findUser) throw createHttpError.Unauthorized("No user found");

    const match = await matchPassword(password, findUser.password);
    if (!match)
      throw createHttpError.Unauthorized("Your password is incorrect");

    const findToken = await findTokenByUserId(user_id);
    if (!findToken) throw createHttpError.Unauthorized("No user found");

    const matchToken = refresh_token === findToken.token;
    if (!matchToken)
      throw createHttpError.Unauthorized("Your token is blacklisted");

    const findProfilePic = await findPorfilePicById(user_id);
    if (findProfilePic) {
      await cloudinary.uploader.destroy(
        findProfilePic.dataValues.cloudinary_id
      );
      await deletePorfilePicById(user_id);
    }

    await deleteTokenByUserId(user_id);
    await deleteUserById(user_id);

    res.status(200).json({ message: "user delete succesfull" });
  } catch (error) {
    next(error);
  }
};

//change password
exports.changePasswordController = async (req, res, next) => {
  try {
    const {
      refresh_token: ref_token,
      current_password,
      new_password,
    } = req.body;
    const user_id = req.user_id;

    const compearPass = current_password === new_password;
    if (compearPass)
      throw createHttpError.Conflict(
        "the current password and the new password cannot be the same"
      );

    const findUser = await findUserById(user_id);
    if (!findUser) throw createHttpError.Unauthorized();

    const match = await matchPassword(current_password, findUser.password);
    if (!match)
      throw createHttpError.Unauthorized("Your password is incorrect");

    const findToken = await findTokenByUserId(user_id);
    if (!findToken) throw createHttpError.Unauthorized();

    const matchToken = ref_token === findToken.token;
    if (!matchToken)
      throw createHttpError.Unauthorized("Your token is blacklisted");

    await changePasswordById(user_id, new_password);

    res.status(200).json({ message: "password change succesfull" });
  } catch (error) {
    next(error);
  }
};

//forget password
exports.forgetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const findUser = await findUserByEmail(email);
    if (!findUser) throw createHttpError.Unauthorized("No user found");

    const { id } = findUser;

    const cloneObj = { ...findUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    const createdOtp = await createNewOTP({ user_id: id });
    //send varification email
    const subject = `${createdOtp.dataValues.token} is the code to finish confirming your email`;
    const sitename = process.env.PUBLIC_DOMAIN;
    const otp_code = createdOtp.dataValues.token;
    const mail_name = "reset password";
    const exp_time = process.env.OTP_EXPIRATION;
    const html = mail_body(sitename, otp_code, mail_name, exp_time);

    await sendEmail(email, subject, html);

    res
      .status(200)
      .json({ message: "An OTP code has been sent to your email", info });
  } catch (error) {
    next(error);
  }
};

//forget password
exports.setForgetedPasswordController = async (req, res, next) => {
  try {
    const { user_id, token, new_password } = req.body;

    const findUser = await findUserById(user_id);
    if (!findUser) throw createHttpError.Unauthorized("No user found");

    const findOtp = await findOTPByUserId(user_id);
    if (!findOtp) throw createHttpError.Unauthorized("No user found");

    const isExpired = new Date().getTime() > findOtp.dataValues.expired;
    if (isExpired)
      throw createHttpError.Unauthorized("Your OTP code has expired");

    const matchToken = Number(token) === Number(findOtp.token);
    if (!matchToken)
      throw createHttpError.Unauthorized("OTP code is incorrect");

    await changePasswordById(user_id, new_password);
    await deleteOtpByUserId(user_id);

    const cloneObj = { ...findUser.dataValues };
    delete cloneObj.password;
    const info = cloneObj;

    res
      .status(200)
      .json({ message: "password change succesfull.Try to login", info });
  } catch (error) {
    next(error);
  }
};
