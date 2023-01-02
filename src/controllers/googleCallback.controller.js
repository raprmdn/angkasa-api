const GoogleService = require("../services/google.service");

module.exports = {
  googleLogin: async (req, res) => {
    try {
      const serviceResponse = await GoogleService.googleLogin(req);
      return res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
};
