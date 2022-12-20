const OrderService = require('../services/order.service');

module.exports = {
    create: async (req, res) => {
        try {
            const serviceResponse = await OrderService.create(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
