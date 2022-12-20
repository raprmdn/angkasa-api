const Joi = require('joi').extend(require('@joi/date'));
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

const passengersValidation = Joi.object({
    fullName: Joi.string().max(255).required().label('Full Name'),
    firstName: Joi.string().max(255).allow(null).label('First Name'),
    lastName: Joi.string().max(255).allow(null).label('Last Name'),
    citizenship: Joi.string().max(255).allow(null).label('Citizenship'),
    birthdate: Joi.date().format('YYYY-MM-DD').allow(null).label('Birthdate'),
    passport: Joi.string().max(255).allow(null).label('Passport'),
    passportCitizenship: Joi.string().max(255).allow(null).label('Passport Citizenship'),
    passportExpire: Joi.date().format('YYYY-MM-DD').allow(null).label('Passport Expire'),
});

module.exports = {
    createOrderValidation: (req, res, next) => {
        const schema = Joi.object({
            flightId: Joi.array().items(Joi.number().required()).max(2).required().label('Flight ID'),
            totalPassengers: Joi.number().min(1).required().label('Total Passengers'),
            contact: Joi.object({
                fullName: Joi.string().max(255).required().label('Full Name'),
                email: Joi.string().email().required().label('Email'),
                phone: Joi.string().max(15).required().label('Phone'),
            }),
            passengers: Joi.array().items(passengersValidation)
                .has(passengersValidation).min(1).max(req.body.totalPassengers)
                .required().label('Passengers'),
            paymentMethod: Joi.string().max(255).required().label('Payment Method'),
            class: Joi.string().valid('ECONOMY', 'PREMIUM', 'BUSINESS', 'FIRST CLASS', 'QUIET ZONE')
                .required().label('Seat Class'),
        });

        const { error } = schema.validate(req.body, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    }
};
