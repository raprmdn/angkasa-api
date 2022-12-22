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
    type: Joi.string().valid('KTP', 'Passport').required().label('Type'),
    number: Joi.string().max(255).required().label('Number'),
});

module.exports = {
    indexOrderValidation: (req, res, next) => {
        const schema = Joi.object({
            page: Joi.number().integer().min(1).label('Page'),
            limit: Joi.number().integer().min(1).label('Limit'),
            search: Joi.string().max(255).label('Search'),
        });

        const { error } = schema.validate(req.query, options);

        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
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
                .has(passengersValidation).min(req.body.totalPassengers || 1).max(req.body.totalPassengers || 1)
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
