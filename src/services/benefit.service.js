const { Benefit } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");

module.exports = {
  createBenefit: async (req) => {
    try {
      const { name, icon } = req.body;

      const newBenefit = await Benefit.create({
        name: name.toUpperCase(),
        icon,
      });

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success to created a new Benefit",
        {
          benefit: newBenefit,
        }
      );
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
  showBenefit: async (req) => {
    try {
      const { id } = req.params;
      const benefit = await Benefit.findByPk(id);

      if (!benefit)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Benefit not found");

      return apiResponse(status.OK, "OK", "Success to get a Benefit", {
        benefit,
      });
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  getBenefits: async (req) => {
    try {
      const benefits = await Benefit.findAll();

      if (!benefits)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Benefit not found",
          []
        );

      return apiResponse(status.OK, "OK", "Success to get all Benefits", {
        benefits,
      });
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  updateBenefit: async (req) => {
    try {
      const { name, icon } = req.body;
      const { id } = req.params;

      const benefit = await Benefit.findByPk(id);
      if (!benefit) {
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "benefit not found");
      }

      await benefit.update({
        name: name ? name.toUpperCase() : undefined,
        icon,
      });

      return apiResponse(status.OK, "OK", "Success to updated a Benefit");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  deleteBenefit: async (req) => {
    try {
      const { id } = req.params;
      const benefit = await Benefit.findByPk(id);
      if (!benefit)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Benefit not found");

      await benefit.destroy();

      return apiResponse(status.OK, "OK", "Success to deleted a Benefit");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
};
