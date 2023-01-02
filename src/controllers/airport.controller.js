const AirportService = require('../services/airport.service');

module.exports = {
    findAirport: async (req, res) => {
        try {
            const serviceResponse = await AirportService.findAirport(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    popularAirports: async (req, res) => {
        try {
            const serviceResponse = await AirportService.popularAirports();
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    create: async (req, res) => {
        try {
            const serviceResponse = await AirportService.create(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await AirportService.show(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    update: async (req, res) => {
        try {
            const serviceResponse = await AirportService.update(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    delete: async (req, res) => {
        try {
            const serviceResponse = await AirportService.delete(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
