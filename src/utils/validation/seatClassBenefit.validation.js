const Joi = require("joi");
const {
  isBenefitAvailable,
  isSeatClassAvailable,
} = require("./existValidation");
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
  seatClassBenefitCreateValidation: async (req, res, next) => {
    const schema = Joi.object({
      seatClassId: Joi.number()
        .required()
        .label("seatClassId")
        .external(async (value) => {
          return await isSeatClassAvailable(value);
        }),
      benefitId: Joi.number()
        .required()
        .label("benefitId")
        .external(async (value) => {
          return await isBenefitAvailable(value);
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
