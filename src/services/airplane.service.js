const { Airline, Airplane, SeatClass, Benefit } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { AirplaneResponse } = require("../helpers/transformers/airline.transformers");

module.exports = {
    show: async (req) => {
        try {
            const { id } = req.params;

            const airplaneModel = await Airplane.findByPk(id, {
                include: [
                    {
                        model: Airline,
                        as: "airline",
                        attributes: ["name", "logo"],
                    },
                    {
                        model: SeatClass,
                        as: "seatClasses",
                        attributes: ["type"],
                        through: {
                            attributes: ["seat"],
                        },
                        include: [
                            {
                                model: Benefit,
                                as: "benefits",
                                attributes: ["name", "icon"],
                                through: {
                                    attributes: [],
                                }
                            }
                        ]
                    },
                ],
                attributes: { exclude: ["createdAt", "updatedAt", "airlineId"] },
            });
            const airplane = AirplaneResponse(airplaneModel);

            return apiResponse(status.OK, 'OK', 'Airplane retrieved successfully', { airplane });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
