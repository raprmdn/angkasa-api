const Joi = require("joi");
const {
  apiResponseValidationError,
  apiResponse,
} = require("../apiResponse.utils");
const { StatusCodes: status } = require("http-status-codes");
const { User } = require("../../models");

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
  abortEarly: false,
};

module.exports = {
  createNotificationValidation: async (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().required().label("title"),
      body: Joi.string().required().label("body"),
      type: Joi.string().required().label("type"),
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
  // checks if the Notification.UserId is also in User.id
  isNotificationUserIdExist: async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (!user)
      throw apiResponse(
        status.NOT_FOUND,
        "NOT_FOUND",
        "The user related with the Notification does not exist"
      );
  },
};
