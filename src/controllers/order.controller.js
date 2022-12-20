const OrderService = require('../services/order.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await OrderService.index(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await OrderService.show(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    create: async (req, res) => {
        try {
            const serviceResponse = await OrderService.create(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
