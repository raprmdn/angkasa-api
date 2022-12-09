const AirlineService = require("../services/airline.service");

module.exports = {
  createAirline: async (req, res) => {
    try {
      const airlineServiceResponse = await AirlineService.createAirline(req);
      return res
        .status(airlineServiceResponse.code)
        .json(airlineServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  showAirline: async (req, res) => {
    try {
      const airlineServiceResponse = await AirlineService.showAirline(req);
      return res
        .status(airlineServiceResponse.code)
        .json(airlineServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  getAirlines: async (req, res) => {
    try {
      const airlineServiceResponse = await AirlineService.getAirlines(req);
      return res
        .status(airlineServiceResponse.code)
        .json(airlineServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  updateAirline: async (req, res) => {
    try {
      const airlineServiceResponse = await AirlineService.updateAirline(req);
      return res
        .status(airlineServiceResponse.code)
        .json(airlineServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  deleteAirline: async (req, res) => {
    try {
      const airlineServiceResponse = await AirlineService.deleteAirline(req);
      return res
        .status(airlineServiceResponse.code)
        .json(airlineServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
};
