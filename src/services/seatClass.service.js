const { SeatClass } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");

module.exports = {
  createSeatClass: async (req) => {
    try {
      const { type } = req.body;

      const newSeatClass = await SeatClass.create({
        type: type.toUpperCase(),
      });

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success to created a new seat class",
        {
          SeatClass: newSeatClass,
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
  showSeatClass: async (req) => {
    try {
      const { id } = req.params;
      const seatClass = await SeatClass.findByPk(id);

      if (!seatClass)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Seat class not found"
        );

      return apiResponse(status.OK, "OK", "Success to get a seat class", {
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

  getSeatClasss: async (req) => {
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

  updateSeatClass: async (req) => {
    try {
      const { type } = req.body;
      const { id } = req.params;

      const SeatClass = await SeatClass.findByPk(id);
      if (!SeatClass) {
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Seat class not found"
        );
      }

      await SeatClass.update({
        type: type ? type.toUpperCase() : undefined,
      });

      return apiResponse(status.OK, "OK", "Success to updated a seat class");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  deleteSeatClass: async (req) => {
    try {
      const { id } = req.params;
      const seatClass = await SeatClass.findByPk(id);
      if (!seatClass)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Seat class not found"
        );

      await seatClass.destroy();

      return apiResponse(status.OK, "OK", "Success to deleted a seat class");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
};
