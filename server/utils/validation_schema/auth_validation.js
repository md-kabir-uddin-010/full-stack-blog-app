const Joi = require("joi");

// signup schema
const signup_schema = Joi.object({
  name: Joi.string()
    .regex(/^[0-9A-Za-z\s\-]+$/)
    .messages({
      "string.pattern.base": `only lowercase ,uppercase, letters, numbers, and hypen (-) are allowed`,
    })
    .trim()
    .min(2)
    .max(64)
    .required(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .lowercase()
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.pattern.base": `password must have lower and uppercase letters number and special characters`,
    })
    .min(16)
    .max(64)
    .required(),
});

// login schema
const login_schema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .lowercase()
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.pattern.base": `password must have lower and uppercase letters number and special characters`,
    })
    .min(16)
    .max(64)
    .required(),
});
// otp varification schema
const otp_varify_schema = Joi.object({
  user_id: Joi.string()
    .regex(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    .messages({ "string.pattern.base": `invalid user_id .` })
    .required(),
  token: Joi.string()
    .regex(/^[0-9]{6}$/)
    .messages({ "string.pattern.base": `token must have 6 digits.` })
    .required(),
});
// refresh token varification schema
const refresh_token_varify_schema = Joi.object({
  refresh_token: Joi.string()
    .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/)
    .messages({ "string.pattern.base": `refresh token is not valid.` })
    .required(),
});

//delete user varification schema
const delete_user_varify_schema = Joi.object({
  refresh_token: Joi.string()
    .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/)
    .messages({ "string.pattern.base": `refresh token is not valid.` })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.pattern.base": `password must have lower and uppercase letters number and special characters`,
    })
    .min(16)
    .max(64)
    .required(),
});

//change password varification schema
const change_password_schema = Joi.object({
  refresh_token: Joi.string()
    .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/)
    .messages({ "string.pattern.base": `refresh token is not valid.` })
    .required(),
  current_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.pattern.base": `password must have lower and uppercase letters number and special characters`,
    })
    .min(16)
    .max(64)
    .required(),
  new_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.pattern.base": `password must have lower and uppercase letters number and special characters`,
    })
    .min(16)
    .max(64)
    .required(),
});

//forget password varification schema
const forget_password_shema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .lowercase()
    .required(),
});

//set forgeted password varification schema
const set_forgeted_password_shema = Joi.object({
  user_id: Joi.string()
    .regex(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    .messages({ "string.pattern.base": `invalid user_id .` })
    .required(),
  token: Joi.string()
    .regex(/^[0-9]{6}$/)
    .messages({ "string.pattern.base": `token must have 6 digits.` })
    .required(),
  new_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.pattern.base": `password must have lower and uppercase letters number and special characters`,
    })
    .min(16)
    .max(64)
    .required(),
});

//update name and profile pic vaidation
const edit_profile_schema = Joi.object({
  name: Joi.string()
    .regex(/^[0-9A-Za-z\s\-]+$/)
    .messages({
      "string.pattern.base": `only lowercase ,uppercase, letters, numbers, and hypen (-) are allowed`,
    })
    .trim()
    .min(2)
    .max(64)
    .required(),
  image: Joi.any(),
});

module.exports = {
  signup_schema,
  login_schema,
  otp_varify_schema,
  refresh_token_varify_schema,
  delete_user_varify_schema,
  change_password_schema,
  forget_password_shema,
  set_forgeted_password_shema,
  edit_profile_schema,
};
