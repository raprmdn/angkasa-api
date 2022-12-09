const Joi = require("joi");
const { isBenefitNameExist } = require("./existValidation");
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
  benefitCreateValidation: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .label("name")
        .external(async (value) => {
          return await isBenefitNameExist(value, req.params.id);
        }),
      icon: Joi.string().required().label("icon"),
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
  benefitUpdateValidation: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .label("name")
        .external(async (value) => {
          return await isBenefitNameExist(value, req.params.id);
        }),
      icon: Joi.string().label("icon"),
    }).or("name", "icon");
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
