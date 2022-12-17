const User = require("../../models/User");
const Token = require("../../models/Token");
const OTP = require("../../models/OTP");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

//find user by id
const findUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//find token by user id
const findTokenByUserId = async (user_id) => {
  try {
    const token = await Token.findOne({ where: { user_id } });
    return token;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//find otp by user id
const findOTPByUserId = async (user_id) => {
  try {
    const findOtp = await OTP.findOne({ where: { user_id } });
    return findOtp;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//find user by email
const findUserByEmail = async (email) => {
  try {
    const findEmail = await User.findOne({ where: { email } });
    return findEmail;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//find user by role
const findUserByRole = async (role) => {
  try {
    const findRole = await User.findOne({ where: { role } });
    return findRole;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//create new user
const createNewUser = async ({ name, email, password }) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const created = await User.create({ name, email, password: hashPassword });
    return created;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//match password when user log in
const matchPassword = async (send_pass, save_pass) => {
  try {
    const match = await bcrypt.compare(send_pass, save_pass);
    return match;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//create new token
const createNewToken = async ({ user_id, token }) => {
  try {
    //first check alredy has token
    const isExist = await findTokenByUserId(user_id);
    if (isExist) {
      const updated = await Token.update({ token }, { where: { user_id } });
      return updated;
    }
    //no token exist
    const created = await Token.create({ user_id, token });
    return created;
  } catch (error) {
    createError.InternalServerError();
  }
};

// chack tokn is expired
const findOtpIsExpired = async (user_id) => {
  try {
    const findOtp = await findOTPByUserId(user_id);
    const expired = findOtp.expired === new Date().getTime();
    return expired;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//random number genarator
const randomNumber = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

//create new OTP
const createNewOTP = async ({ user_id }) => {
  try {
    const token = randomNumber(6);
    const validity = process.env.OTP_EXPIRATION;
    const expired = new Date().getTime() + validity * 60000;
    //first check alredy has token
    const isExist = await findOTPByUserId(user_id);
    if (isExist) {
      await OTP.update({ token, expired }, { where: { user_id } });
      const newOTPFind = await findOTPByUserId(user_id);
      return newOTPFind;
    }
    //no token exist
    const created = await OTP.create({ user_id, token, expired });
    return created;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//verify user  otp
const verifyedUser = async (id, verifyed = false) => {
  try {
    await User.update({ verifyed }, { where: { id } });
    const findUser = await findUserById(id);
    return findUser;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//delete otp
const deleteOtpByUserId = async (user_id) => {
  try {
    const deleted = await OTP.destroy({ where: { user_id } });
    return deleted;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//delete token by user id
const deleteTokenByUserId = async (user_id) => {
  try {
    const deleted = await Token.destroy({ where: { user_id } });
    return deleted;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//delete user by user id
const deleteUserById = async (user_id) => {
  try {
    const deleted = await User.destroy({ where: { id: user_id } });
    return deleted;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//change password
const changePasswordById = async (id, password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const changed = await User.update(
      { password: hashPassword },
      { where: { id } }
    );
    return changed;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//change password
const changeProfilePicById = async (id, profile_picture) => {
  try {
    const changed = await User.update({ profile_picture }, { where: { id } });
    return changed;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//change name
const changeNameById = async (id, name) => {
  try {
    await User.update({ name }, { where: { id } });
    const changed = await findUserById(id);
    return changed;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  findUserByEmail,
  findUserByRole,
  findUserByEmail,
  createNewUser,
  createNewToken,
  findUserById,
  findTokenByUserId,
  createNewOTP,
  findOTPByUserId,
  findOtpIsExpired,
  matchPassword,
  verifyedUser,
  deleteOtpByUserId,
  deleteTokenByUserId,
  deleteUserById,
  changePasswordById,
  changeProfilePicById,
  changeNameById,
};
