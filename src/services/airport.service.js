const { Airport } = require('../models');
const fetch = require('node-fetch')
const { StatusCodes: status } = require('http-status-codes');
const { apiResponse, apiNotFoundResponse } = require('../utils/apiResponse.utils');
const AirportTransform = require('../helpers/transformers/airport.transformers');

module.exports = {
    findAirport: async (req) => {
        try {
            const { airport } = req.query;

            const response = await fetch(`https://port-api.com/port/suggest/${airport}`)
                .catch((e) => {
                    console.error(`Error fetching airport on port-api.com: ${e}`);
                    throw apiResponse(status.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', 'There\'s an issue. Please try again later.');
                });
            const data = await response.json();
            const filteredData = data.features.filter((item) => item.properties.iata !== null);
            const airports = AirportTransform.AirportApiCollectionResponse(filteredData);

            return apiResponse(status.OK, 'OK', 'Airports retrieved successfully', { airports });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    popularAirports: async () => {
        try {
            const airports = await Airport.findAll({
                limit: 10,
                order: [ ['id', 'ASC'] ],
            });
            const airportTransformed = AirportTransform.AirportCollectionResponse(airports);

            return apiResponse(status.OK, 'OK', 'Popular airports retrieved successfully', { airports: airportTransformed });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    create: async (req) => {
        try {
            const { name, country, region, municipality, iata, type } = req.body;
            await Airport.create({ name, country, region, municipality, iata, type });

            return apiResponse(status.CREATED, 'CREATED', 'Airport created successfully');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (req) => {
        try {
            const { id } = req.params;
            const airport = await Airport.findByPk(id);

            if (!airport) {
                throw apiNotFoundResponse('Airport not found');
            }

            const airportTransformed = AirportTransform.AirportResponse(airport);

            return apiResponse(status.OK, 'OK', 'Airport retrieved successfully', { airport: airportTransformed });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    update: async (req) => {
        try {
            const { id } = req.params;
            const { name, country, region, municipality, iata, type } = req.body;

            const airport = await Airport.findByPk(id);
            if (!airport) {
                throw apiNotFoundResponse('Airport not found');
            }

            const updatedAirport = await airport.update({ name, country, region, municipality, iata, type });
            const airportTransformed = AirportTransform.AirportResponse(updatedAirport);

            return apiResponse(status.OK, 'OK', 'Airport updated successfully', { airport: airportTransformed });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    delete: async (req) => {
        try {
            const { id } = req.params;

            const airport = await Airport.findByPk(id);
            if (!airport) {
                throw apiNotFoundResponse('Airport not found');
            }

            await airport.destroy();

            return apiResponse(status.OK, 'OK', 'Airport deleted successfully');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
};
