const Joi = require("joi");

//  post schema
const comment_schema = Joi.object({
  post_id: Joi.string()
    .regex(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    .messages({ "string.pattern.base": `invalid post_id .` })
    .required(),
  post_title: Joi.string().min(10).max(65).required(),
  post_slug: Joi.string()
    .regex(/^[a-z0-9-]+$/)
    .messages({
      "string.pattern.base": ` post_slug only lowercase letters, numbers, and hypen (-) are allowed`,
    })
    .min(10)
    .max(200)
    .required(),

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
  comment: Joi.string().min(2).max(500).required(),
});

module.exports = {
  comment_schema,
};
