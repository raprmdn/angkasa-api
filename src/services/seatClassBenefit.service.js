const { SeatClassBenefit } = require("../models");
const {
  isSeatClassBenefitExist,
} = require("../utils/validation/existValidation");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");

module.exports = {
  createSeatClassBenefit: async (req) => {
    try {
      const { seatClassId, benefitId } = req.body;

      await isSeatClassBenefitExist(seatClassId, benefitId);

      const newSeatClassBenefit = await SeatClassBenefit.create({
        seatClassId: seatClassId,
        benefitId: benefitId,
      });

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success to created a new seat class benefit",
        {
          SeatClass: newSeatClassBenefit,
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

  getSeatClassBenefits: async (req) => {
    try {
      const seatClassBenefit = await SeatClassBenefit.findAll();

      if (!seatClassBenefit)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Seat Class Benefit not found",
          []
        );

      return apiResponse(
        status.OK,
        "OK",
        "Success to get all seat class benefits",
        {
          seatClassBenefit,
        }
      );
    } catch (error) {
      console.log(error);
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
};
