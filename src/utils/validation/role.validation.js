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
  roleValidation: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .label("name")
        .external(async (value) => {
          return await isRoleNameExist(value, req.params.id);
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
  assignRoleValidation: (req, res, next) => {
    const schema = Joi.object({
      roleId: Joi.number().positive().required().label("Role ID"),
      userId: Joi.number().positive().required().label("User ID"),
    });

    const { error } = schema.validate(req.body, options);
    if (error) return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));

    next();
  }
};
