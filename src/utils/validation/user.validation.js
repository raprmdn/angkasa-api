const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { StatusCodes: status } = require("http-status-codes");
const { isEmailExist, isUsernameExist } = require("./existValidation");
const { apiResponseValidationError } = require("../apiResponse.utils");

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
  abortEarly: false,
};

const complexityOptions = {
  min: 8,
  max: 25,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
  requirementCount: 0,
};

module.exports = {
  register: async (req, res, next) => {
    const schema = Joi.object({
      fullname: Joi.string().max(255).required().label("fullname"),
      username: Joi.string()
        .min(5)
        .max(25)
        .required()
        .label("username")
        .external(async (value) => {
          return await isUsernameExist(value);
        }),
      email: Joi.string()
        .email()
        .max(255)
        .required()
        .label("email")
        .external(async (value) => {
          return await isEmailExist(value);
        }),
      password: passwordComplexity(complexityOptions)
        .required()
        .label("password"),
      passwordConfirmation: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .label("passwordConfirmation")
        .options({ messages: { "any.only": "{{#label}} does not match" } }),
    });

    try {
      await schema.validateAsync(req.body, options);
      next();
    } catch (e) {
      return res
        .status(status.UNPROCESSABLE_ENTITY)
        .json(apiResponseValidationError(e));
    }
  },

  login: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().max(255).required().label("email"),
      password: Joi.string().required().label("password"),
    });

    const { error } = schema.validate(req.body, options);
    if (error) {
      return res
        .status(status.UNPROCESSABLE_ENTITY)
        .json(apiResponseValidationError(error));
    }

    next();
  },
  updateProfile: async (req, res, next) => {
    const schema = Joi.object({
      fullname: Joi.string().max(255).label("fullname"),
      username: Joi.string()
        .min(5)
        .max(25)
        .label("username")
        .external(async (value) => {
          return await isUsernameExist(value);
        }),
    });

    try {
      await schema.validateAsync(req.body, options);
      next();
    } catch (e) {
      return res
        .status(status.UNPROCESSABLE_ENTITY)
        .json(apiResponseValidationError(e));
    }
  },
  updatePassword: async (req, res, next) => {
    const schema = Joi.object({
      oldPassword: Joi.string().required().label("oldPassword"),
      newPassword: passwordComplexity(complexityOptions).label("newPassword"),
      newPasswordConfirmation: Joi.string()
        .valid(Joi.ref("newPassword"))
        .required()
        .label("newPasswordConfirmation")
        .options({ messages: { "any.only": "{{#label}} does not match" } }),
    });

    try {
      await schema.validateAsync(req.body, options);
      next();
    } catch (e) {
      return res
        .status(status.UNPROCESSABLE_ENTITY)
        .json(apiResponseValidationError(e));
    }
  },
};
