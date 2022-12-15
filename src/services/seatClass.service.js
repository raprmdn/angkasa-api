const { SeatClass, Airplane } = require("../models");
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

  // Get Seat Class by Airplane
  airplaneSeatClass: async (req) => {
    try {
      const { id } = req.params;
      const airplane = await Airplane.findByPk(id, {
        include: {
          model: SeatClass,
          as: "seatClasses",
        },
      });

      if (!airplane)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Airplane not found",
          []
        );

      if (!airplane.seatClasses || airplane.seatClasses.length === 0)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Airplane Seat Class not found",
          []
        );
      
      const seatClasses = airplane.seatClasses.map(seatClass => {
        return {
          id: seatClass.id,
          type: seatClass.type,
          seat: seatClass.AirplaneSeatClass.seat,
        }
      })
      return apiResponse(status.OK, "OK", "Success to get all airplane seat class", {
        seatClasses
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
