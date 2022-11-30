const Joi = require("joi");
const { isRoleNameExist } = require("./existValidation");
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

module.exports = {
  roleNameRequired: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .label("name")
        .external(async (value) => {
          return await isRoleNameExist(value);
        }),
    });
    try {
      await schema.validateAsync(req.body, options);
      next();
    } catch (error) {
      return res
        .status(status.UNPROCESSABLE_ENTITY)
        .json(apiResponseValidationError(error));
    }
  },
  roleIdRequired: async (req, res, next) => {
    const schema = Joi.object({
      id: Joi.required().label("id"),
    });
    try {
      await schema.validateAsync(req.body, options);
      next();
    } catch (error) {
      return res
        .status(status.UNPROCESSABLE_ENTITY)
        .json(apiResponseValidationError(error));
    }
  },
  roleIdNameRequired: async (req, res, next) => {
    const schema = Joi.object({
      id: Joi.required().label("id"),
      name: Joi.string()
        .required()
        .label("name")
        .external(async (value) => {
          return await isRoleNameExist(value);
        }),
    });
    try {
      await schema.validateAsync(req.body, options);
      next();
    } catch (error) {
      return res
        .status(status.UNPROCESSABLE_ENTITY)
        .json(apiResponseValidationError(error));
    }
  },
};
