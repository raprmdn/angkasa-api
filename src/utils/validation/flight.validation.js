const Joi = require('joi').extend(require('@joi/date'));
const { StatusCodes: status } = require('http-status-codes');
const { apiResponseValidationError } = require("../apiResponse.utils");
const { isExistsIata } = require("./existValidation");

const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
};

const seatEachPrice = Joi.object({
    airplaneSeatClassId: Joi.number().positive().required().label('Airplane Seat Class ID'),
    price: Joi.number().positive().required().label('Price'),
    discount: Joi.number().optional().integer().min(0).allow(null).label('Discount'),
});

module.exports = {
    flightValidation: async (req, res, next) => {
        const schema = Joi.object({
            airplaneId: Joi.number().required().label('Airplane ID'),
            date: Joi.date().format('YYYY-MM-DD').required().label('Date'),
            from: Joi.string().length(3).required()
                .external(async (value) => {
                    await isExistsIata(req, value, 'from');
                }).label('From Airport (IATA)'),
            to: Joi.string().length(3).required()
                .external(async (value) => {
                    await isExistsIata(req, value, 'to');
                }).disallow(Joi.ref('from')).label('To Airport (IATA)')
                .messages({
                    'any.invalid': 'To Airport (IATA) must be different from From Airport (IATA)',
                }),
            std: Joi.date().format('YYYY-MM-DD HH:mm:ss').greater(Joi.ref('date')).required()
                .label('Schedule Time Departure')
                .messages({
                    'date.greater': 'STD ({#label}) must be greater than date',
                }),
            sta: Joi.date().format('YYYY-MM-DD HH:mm:ss').greater(Joi.ref('std')).required()
                .label('Schedule Time Arrival')
                .messages({
                    'date.greater': 'STA ({#label}) must be greater than STD (Schedule Time Departure)',
                }),
            estimated: Joi.date().format('mm').required().label('Estimated Time'),
            seatPrices: Joi.array()
                .items(seatEachPrice).has(seatEachPrice)
                .min(1).required().label('Airplane Seat Class Price'),
        });

        try {
            await schema.validateAsync(req.body, options);
            next();
        } catch (e) {
            if (e.code === 404) {
                return res.status(e.code).json(e);
            }
            if (e.code === 500) {
                return res.status(e.code).json(e);
            }

            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(e));
        }
    },
    searchFlightValidation: (req, res, next) => {
        const schema = Joi.object({
            departure: Joi.string().length(3).required().label('Departure Airport (IATA)'),
            arrival: Joi.string().length(3).required().label('Arrival Airport (IATA)'),
            date: Joi.date().format('YYYY-MM-DD').required().label('Date'),
            class: Joi.string().valid('ECONOMY', 'PREMIUM', 'BUSINESS', 'FIRST CLASS', 'QUIET ZONE')
                .required().label('Class'),
        });

        const { error } = schema.validate(req.query, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
    showFlightValidation: (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().positive().required().label('Flight ID'),
        });

        const { error } = schema.validate(req.params, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
    rescheduleFlightValidation: (req, res, next) => {
        const schema = Joi.object({
            date: Joi.date().format('YYYY-MM-DD').required().label('Date'),
            std: Joi.date().format('YYYY-MM-DD HH:mm:ss').greater(Joi.ref('date')).required()
                .label('Schedule Time Departure')
                .messages({
                    'date.greater': 'STD ({#label}) must be greater than date',
                }),
            sta: Joi.date().format('YYYY-MM-DD HH:mm:ss').greater(Joi.ref('std')).required()
                .label('Schedule Time Arrival')
                .messages({
                    'date.greater': 'STA ({#label}) must be greater than STD (Schedule Time Departure)',
                }),
            estimated: Joi.date().format('mm').required().label('Estimated Time'),
        });

        const { error } = schema.validate(req.body, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
    changeSeatPriceValidation: (req, res, next) => {
        const schema = Joi.object({
            seatPrices: Joi.array()
                .items({
                    id: Joi.number().positive().required().label('Flight Seat Price ID'),
                    price: Joi.number().positive().required().label('Price'),
                    discount: Joi.number().optional().integer().min(0).allow(null).label('Discount'),
                })
                .has({
                    id: Joi.number().positive().required().label('Flight Seat Price ID'),
                    price: Joi.number().positive().required().label('Price'),
                    discount: Joi.number().optional().integer().min(0).allow(null).label('Discount'),
                })
                .unique('id')
                .min(1).required().label('Airplane Seat Class Price'),
        });

        const { error } = schema.validate(req.body, options);
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
};
