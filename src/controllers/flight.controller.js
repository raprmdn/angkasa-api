const FlightService = require('../services/flight.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await FlightService.index();
            res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            res.status(e.code).json(e);
        }
    },
    search: async (req, res) => {
        try {
            const serviceResponse = await FlightService.search(req);
            res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await FlightService.show(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    create: async (req, res) => {
        try {
            const serviceResponse = await FlightService.create(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    changeSeatPrice: async (req, res) => {
        try {
            const serviceResponse = await FlightService.changeSeatPrice(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
};
