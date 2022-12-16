const { Flight, Airplane, Airline, SeatClass, Benefit, SeatPrice, sequelize } = require('../models');
const { Op } = require('sequelize');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponse, apiNotFoundResponse, apiBadRequestResponse } = require("../utils/apiResponse.utils");
const { FormatFlightDate, FormatFlightEstimated, generateFlightNumber, CheckAvailabilityFlights } = require('../helpers/flight.helper');
const { FlightIndexTransform, FlightSearchTransform, FlightShowTransform } = require("../helpers/transformers/flight.transformers");
const moment = require("moment");

module.exports = {
    index: async () => {
        try {
            const response = await Flight.findAll({
                include: [
                    {
                        model: Airplane,
                        as: 'airplane',
                        attributes: ['id', 'type', 'airplaneCode', 'seat'],
                        include: [
                            {
                                model: Airline,
                                as: 'airline',
                                attributes: ['id', 'name', 'airlineIata', 'logo'],
                            }
                        ]
                    },
                    {
                        model: SeatPrice,
                        as: 'seatPrices',
                    }
                ],
                order: [
                    ['id', 'ASC']
                ]
            });
            const flights = FlightIndexTransform(response);

            return apiResponse(status.OK, 'OK', 'Flights retrieved successfully', { flights });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    search: async (req) => {
        try {
            const { departure, arrival, date, class: seatClass } = req.query;

            const response = await Flight.findAndCountAll({
                where: {
                    fromAirportIata: departure,
                    toAirportIata: arrival,
                    date: date,
                    std: {
                        [Op.gte]: moment().format()
                    },
                },
                include: [
                    {
                        model: Airplane,
                        as: 'airplane',
                        attributes: ['id', 'type', 'airplaneCode', 'seat'],
                        include: [
                            {
                                model: Airline,
                                as: 'airline',
                                attributes: ['id', 'name', 'airlineIata', 'logo'],
                            },
                            {
                                model: SeatClass,
                                as: 'seatClasses',
                                attributes: ['id', 'type'],
                                through: {
                                    attributes: ['seat']
                                },
                                where: {
                                    type: seatClass
                                },
                                include: [
                                    {
                                        model: Benefit,
                                        as: 'benefits',
                                        attributes: ['id', 'name', 'icon'],
                                        through: {
                                            attributes: []
                                        }
                                    }
                                ]
                            }
                        ],
                        required: true
                    },
                    {
                        model: SeatPrice,
                        as: 'seatPrices',
                        where: {
                            seatType: seatClass
                        },
                        required: true
                    },
                ],
                distinct: true,
            });
            const flights = FlightSearchTransform(response.rows);

            return apiResponse(status.OK, 'OK', 'Flights retrieved successfully', {
                flightsCount: response.count,
                flights
            });
        } catch (e) {
            console.log(e);
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (req) => {
        try {
            const { id } = req.params;

            const flightExists = await Flight.findByPk(id);
            if (!flightExists) {
                throw apiNotFoundResponse('Flight not found');
            }

            const response = await Flight.findByPk(id, {
                include: [
                    {
                        model: Airplane,
                        as: 'airplane',
                        attributes: ['id', 'type', 'airplaneCode', 'seat'],
                        include: [
                            {
                                model: Airline,
                                as: 'airline',
                                attributes: ['id', 'name', 'airlineIata', 'logo'],
                            },
                            {
                                model: SeatClass,
                                as: 'seatClasses',
                                attributes: ['id', 'type'],
                                through: {
                                    attributes: ['seat']
                                },
                                include: [
                                    {
                                        model: Benefit,
                                        as: 'benefits',
                                        attributes: ['id', 'name', 'icon'],
                                        through: {
                                            attributes: []
                                        }
                                    }
                                ]
                            }
                        ],
                        required: true
                    },
                    {
                        model: SeatPrice,
                        as: 'seatPrices',
                        required: true
                    },
                ],
                distinct: true,
            });
            const flight = FlightShowTransform(response);

            return apiResponse(status.OK, 'OK', 'Flight retrieved successfully', { flight });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    create: async (req) => {
        try {
            await sequelize.transaction(async (t) => {
                const { airplaneId, date, std, sta, estimated, seatPrices } = req.body;
                const from = req.airportFrom.properties;
                const to = req.airportTo.properties;

                const airplane = await Airplane.findByPk(airplaneId);
                if (!airplane) {
                    throw apiNotFoundResponse('Airplane not found');
                }

                await CheckAvailabilityFlights(airplaneId, std, sta, date);

                const seatClassIds = seatPrices.map((seatPrice) => seatPrice.airplaneSeatClassId);
                const seatClasses = await airplane.getSeatClasses({ where: { id: seatClassIds } });
                if (seatClasses.length !== seatClassIds.length) {
                    throw apiNotFoundResponse('Seat class not found');
                }

                const flightDate = FormatFlightDate(date);
                const flightEstimated = FormatFlightEstimated(estimated);
                const flightNumber = generateFlightNumber(await airplane.getAirline());

                const flight = await airplane.createFlight({
                    flightNumber,
                    date: flightDate,
                    fromAirportIata: from.iata || null,
                    fromAirportName: from.name || null,
                    fromAirportCountry: from.country.name || null,
                    fromAirportCity: from.municipality || null,
                    toAirportIata: to.iata || null,
                    toAirportName: to.name || null,
                    toAirportCountry: to.country.name || null,
                    toAirportCity: to.municipality || null,
                    std,
                    sta,
                    estimated: flightEstimated,
                }, { transaction: t });

                await Promise.all(
                    seatPrices.map(async (seatPrice) => {
                        await flight.createSeatPrice({
                            seatType: seatClasses.find((seatClass) => seatClass.id === seatPrice.airplaneSeatClassId).type,
                            price: seatPrice.price,
                            discount: seatPrice.discount,
                        }, { transaction: t });
                    }
                ));

            });

            return apiResponse(status.CREATED, 'CREATED', 'Flight created successfully');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    reschedule: async (req) => {
        try {
            await sequelize.transaction(async (t) => {
                const { id } = req.params;
                const { date, std, sta, estimated } = req.body;

                const flight = await Flight.findByPk(id);
                if (!flight) {
                    throw apiNotFoundResponse('Flight not found');
                }

                await CheckAvailabilityFlights(flight.airplaneId, std, sta, date, id);

                const flightDate = FormatFlightDate(date);
                const flightEstimated = FormatFlightEstimated(estimated);

                await flight.update({
                    date: flightDate,
                    std,
                    sta,
                    estimated: flightEstimated,
                }, { transaction: t });
            });

            return apiResponse(status.OK, 'OK', 'Flight rescheduled successfully');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    changeSeatPrice: async (req) => {
        try {
            const { id } = req.params;
            const { seatPrices } = req.body;

            const flight = await Flight.findByPk(id);
            if (!flight) {
                throw apiNotFoundResponse('Flight not found');
            }

            const flightSeatPrices = await flight.getSeatPrices();
            const flightSeatPricesIds = flightSeatPrices.map((flightSeatPrice) => flightSeatPrice.id);
            const seatPricesIds = seatPrices.map((seatPrice) => seatPrice.id);
            if (!seatPricesIds.every((seatPriceId) => flightSeatPricesIds.includes(seatPriceId))) {
                throw apiBadRequestResponse('The provided seat prices are not valid for this flight');
            }

            await Promise.all(
                seatPrices.map(async (seatPrice) => {
                    const flightSeatPrice = flightSeatPrices.find((flightSeatPrice) => flightSeatPrice.id === seatPrice.id);
                    await flightSeatPrice.update({
                        price: seatPrice.price,
                        discount: seatPrice.discount,
                    });
                })
            );


            return apiResponse(status.OK, 'OK', 'Flight seat price updated successfully');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
