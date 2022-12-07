const Joi = require('joi');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponseValidationError } = require('../apiResponse.utils');

const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
};

module.exports = {
    airportValidation: async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().required().max(255).label('Name'),
            country: Joi.string().required().max(255).label('Country'),
            region: Joi.string().required().max(255).label('Region'),
            municipality: Joi.string().required().max(255).label('Municipality'),
            iata: Joi.string().required().length(3).label('IATA'),
            type: Joi.string().required().max(255).label('Type'),
        });

        const { error } = schema.validate(req.body, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
    searchAirportValidation: async (req, res, next) => {
        const schema = Joi.object({
            airport: Joi.string().required().max(255).label('Airport'),
        });

        const { error } = schema.validate(req.query, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    }
};
