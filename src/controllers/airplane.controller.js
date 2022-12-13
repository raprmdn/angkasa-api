const AirplaneService = require('../services/airplane.service');

module.exports = {
    show: async (req, res) => {
        try {
            const serviceResponse = await AirplaneService.show(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
