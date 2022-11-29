const Joi = require('joi');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponseValidationError } = require("../apiResponse.utils");

const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
};

module.exports = {
    verifyUserEmailOTPValidation: (req, res, next) => {
        const schema = Joi.object({
            otp: Joi.number().required().label('OTP')
        });

        const { error } = schema.validate(req.body, options);
        if (error) return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));

        next();
    }
};
