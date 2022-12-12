const { SeatClass } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");

module.exports = {
  getSeatClass: async (req) => {
    try {
      const seatClass = await SeatClass.findAll();

      if (!seatClass)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "SeatClass not found",
          []
        );

      return apiResponse(status.OK, "OK", "Success to get all seat class", {
        seatClass,
      });
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
};
