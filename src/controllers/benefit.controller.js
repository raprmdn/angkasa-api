const BenefitService = require("../services/benefit.service");

module.exports = {
  createBenfit: async (req, res) => {
    try {
      const benefitServiceResponse = await BenefitService.createBenefit(req);
      return res
        .status(benefitServiceResponse.code)
        .json(benefitServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  showBenefit: async (req, res) => {
    try {
      const benefitServiceResponse = await BenefitService.showBenefit(req);
      return res
        .status(benefitServiceResponse.code)
        .json(benefitServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  getBenefits: async (req, res) => {
    try {
      const benefitServiceResponse = await BenefitService.getBenefits(req);
      return res
        .status(benefitServiceResponse.code)
        .json(benefitServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  updateBenefit: async (req, res) => {
    try {
      const benefitServiceResponse = await BenefitService.updateBenefit(req);
      return res
        .status(benefitServiceResponse.code)
        .json(benefitServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  deleteBenefit: async (req, res) => {
    try {
      const benefitServiceResponse = await BenefitService.deleteBenefit(req);
      return res
        .status(benefitServiceResponse.code)
        .json(benefitServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
};
