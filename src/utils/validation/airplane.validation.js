const Joi = require('joi');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponseValidationError } = require("../apiResponse.utils");
const { isAirplaneCodeExists } = require("./existValidation");

const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: '',
        },
    },
    convert: false,
};

const seatClassValidation = Joi.object({
    seatClassId: Joi.number().required().label('Seat Class ID'),
    seat: Joi.number().required().label('Seat Class Total Seat'),
});

module.exports = {
    airplaneValidation: async (req, res, next) => {
        const schema = Joi.object({
            airlineId: Joi.number().required().label('Airline ID'),
            type: Joi.string().required().label('Airplane Type'),
            airplaneCode: Joi.string().required().uppercase({ force: true }).external(async (value) => {
                return await isAirplaneCodeExists(value);
            }).label('Airplane Code'),
            seat: Joi.number().required().label('Airplane Total Seat'),
            seatClass: Joi.array()
                .items(seatClassValidation)
                .has(seatClassValidation)
                .required()
                .label('Airplane Seat Class'),
        });

        try {
            await schema.validateAsync(req.body, options);
            next();
        } catch (e) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(e));
        }
    },
};
