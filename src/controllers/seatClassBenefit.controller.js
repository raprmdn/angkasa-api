const seatClassBenefitService = require("../services/seatClassBenefit.service");
const seatClassService = require("../services/seatClass.service");

module.exports = {
  createSeatClassBenefit: async (req, res) => {
    try {
      const SCBServiceResponse =
        await seatClassBenefitService.createSeatClassBenefit(req);
      return res.status(SCBServiceResponse.code).json(SCBServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  getSeatClassBenefits: async (req, res) => {
    try {
      const SCBServiceResponse =
        await seatClassBenefitService.getSeatClassBenefits(req);
      return res.status(SCBServiceResponse.code).json(SCBServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  getSeatClass: async (req, res) => {
    try {
      const seatClassServiceResponse = await seatClassService.getSeatClass(req);
      return res
        .status(seatClassServiceResponse.code)
        .json(seatClassServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
};
