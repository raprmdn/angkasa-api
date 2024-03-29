const userServices = require("../services/user.service");

module.exports = {
  register: async (req, res) => {
    try {
      const userServicesResponse = await userServices.register(req);
      return res.status(userServicesResponse.code).json(userServicesResponse);
    } catch (err) {
      return res.status(err.code).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const userServicesResponse = await userServices.login(req);
      return res.status(userServicesResponse.code).json(userServicesResponse);
    } catch (err) {
      return res.status(err.code).json(err);
    }
  },
  me: async (req, res) => {
    try {
      const userServiceResponse = await userServices.me(req);
      return res.status(userServiceResponse.code).json(userServiceResponse);
    } catch (e) {
      return res.status(e.code).json(e);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const userServiceResponse = await userServices.updateProfile(req);
      return res.status(userServiceResponse.code).json(userServiceResponse);
    } catch (e) {
      return res.status(e.code).json(e);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const userServiceResponse = await userServices.updatePassword(req);
      return res.status(userServiceResponse.code).json(userServiceResponse);
    } catch (e) {
      return res.status(e.code).json(e);
    }
  },
};
