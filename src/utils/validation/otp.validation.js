const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
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
    },
    requestResetPasswordValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().required().label('Email')
        });

        const { error } = schema.validate(req.body, options);
        if (error) return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));

        next();
    },
    verifyResetPasswordOTPValidation: (req, res, next) => {
        const schema = Joi.object({
            otp: Joi.number().required().label('OTP'),
            email: Joi.string().email().required().label('Email'),
        });

        const { error } = schema.validate(req.body, options);
        if (error) return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));

        next();
    },
    resetPasswordValidation: (req, res, next) => {
        const schema = Joi.object({
            otp: Joi.number().required().label('OTP'),
            email: Joi.string().email().required().label('Email'),
            password: passwordComplexity().required().label('Password'),
            passwordConfirmation: Joi.string().required().valid(Joi.ref('password'))
                .label('Password Confirmation')
                .messages({ 'any.only': 'Password Confirmation does not match with the Password' }),
        });

        const { error } = schema.validate(req.body, options);
        if (error) return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));

        next();
    }
};
