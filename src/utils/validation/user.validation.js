const Joi = require("joi");
const { isEmailExist, isUsernameExist } = require("./existValidation");
const { apiResponseValidationError } = require("../apiResponse.utils");
const { StatusCodes: status } = require("http-status-codes");

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
  abortEarly: false,
};

const passwordComplexity = require("joi-password-complexity");
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
};
