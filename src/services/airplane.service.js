const { Airline, Airplane, SeatClass, Benefit, sequelize } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse, apiNotFoundResponse } = require("../utils/apiResponse.utils");
const { AirplaneResponse } = require("../helpers/transformers/airplane.transformers");

module.exports = {
    create: async (req) => {
        try {
            await sequelize.transaction(async (t) => {
                const { airlineId, type, airplaneCode, seat, seatClass } = req.body;

                const airline = await Airline.findByPk(airlineId);
                if (!airline) {
                    throw apiNotFoundResponse('Airline not found');
                }

                const seatClassIds = seatClass.map((item) => item.seatClassId);
                const seatClasses = await SeatClass.findAll({
                    where: {
                        id: seatClassIds,
                    }
                });
                if (seatClasses.length !== seatClassIds.length) {
                    throw apiNotFoundResponse('Seat Class not found');
                }

                const airplane = await airline.createAirplane({ type, airplaneCode, seat }, { transaction: t });

                await Promise.all(
                    seatClass.map(async (item) => {
                        const seatClass = await SeatClass.findByPk(item.seatClassId);
                        return airplane.addSeatClass(seatClass, { through: { seat: item.seat }, transaction: t });
                    })
                );
            });

            return apiResponse(status.CREATED, 'CREATED', 'Airplane created successfully');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (req) => {
        try {
            const { id } = req.params;

            const airplaneExists = await Airplane.findByPk(id);
            if (!airplaneExists) {
                throw apiNotFoundResponse('Airplane not found');
            }

            const airplaneModel = await Airplane.findByPk(id,  {
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
