const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const accessToken = (user_id) => {
  try {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      issuer: process.env.ISSUER,
      audience: user_id,
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const refreshToken = (user_id) => {
  try {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      issuer: process.env.ISSUER,
      audience: user_id,
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  accessToken,
  refreshToken,
};
