const Joi = require("joi");
const { isAirlineNameExist, isAirlineIataExist } = require("./existValidation");
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
  airlineCreateValidation: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .label("name")
        .external(async (value) => {
          return await isAirlineNameExist(value, req.params.id);
        }),
      logo: Joi.string().required().label("logo"),
      iata: Joi.string()
        .required()
        .label("iata")
        .external(async (value) => {
          return await isAirlineIataExist(value, req.params.id);
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
  airlineUpdateValidation: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .label("name")
        .external(async (value) => {
          return await isAirlineNameExist(value, req.params.id);
        }),
      logo: Joi.string().label("logo"),
      iata: Joi.string()
        .label("iata")
        .external(async (value) => {
          return await isAirlineIataExist(value, req.params.id);
        }),
    }).or("name", "logo", "iata");
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
