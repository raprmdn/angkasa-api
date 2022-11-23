const userServices = require("../services/user.service");
const { apiResponse } = require("../utils/apiResponse.utils");
// const { StatusCodes: status } = require("http-status-codes");

module.exports = {
  register: async (req, res) => {
    try {
      const userServicesResponse = await userServices.register(req);
      return res.status(userServicesResponse.code).json(userServicesResponse);
    } catch (err) {
      return res.status(err.code).json(err);
    }
  },
};
