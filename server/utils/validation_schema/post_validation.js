const Joi = require("joi");

//  post schema
const post_schema = Joi.object({
  title: Joi.string().min(10).max(65).required(),
  slug: Joi.string()
    .regex(/^[a-z0-9-]+$/)
    .messages({
      "string.pattern.base": ` slug only lowercase letters, numbers, and hypen (-) are allowed`,
    })
    .min(10)
    .max(200)
    .required(),
  keyword: Joi.string().min(10).max(200).required(),
  description: Joi.string().min(10).max(200).required(),
  thumbnail: Joi.string()
    .regex(
      /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/
    )
    .messages({
      "string.pattern.base": `thumbnail must be a valid url`,
    })
    .min(5)
    .max(500)
    .required(),
  schema: Joi.string().min(5).max(2000),
  category: Joi.string().min(2).max(65).required(),
  post: Joi.string().min(10).max(100000).required(),
  post_description: Joi.string().min(10).max(200).required(),
  open_graph: Joi.object().min(5).max(1000),
  twitter_card: Joi.object().min(5).max(1000),
  publish: Joi.boolean().required(),
});

//post id validation
const post_id_schema = Joi.object({
  post_id: Joi.string()
    .regex(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    .messages({ "string.pattern.base": `invalid post_id .` })
    .required(),
});

//post slug validation
const slug_schema = Joi.object({
  slug: Joi.string()
    .regex(/^[a-z0-9-]+$/)
    .messages({
      "string.pattern.base": ` slug only lowercase letters, numbers, and hypen (-) are allowed`,
    })
    .min(10)
    .max(200)
    .required(),
});

//update popular post validation
const popular_schema = Joi.object({
  popular: Joi.boolean().required(),
});

module.exports = {
  post_id_schema,
  post_schema,
  slug_schema,
  popular_schema,
};
