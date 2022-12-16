const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { Airline, Airplane } = require("../models");

module.exports = {
  createAirline: async (req) => {
    try {
      const { name, logo, iata } = req.body;

      const slug = name.toLowerCase().split(" ").join("-");

      const newAirline = await Airline.create({
        name: name.toUpperCase(),
        logo,
        slug,
        airlineIata: iata.toUpperCase(),
      });

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success to created a new Airline",
        {
          airline: newAirline,
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
  showAirline: async (req) => {
    try {
      const { id } = req.params;
      const airline = await Airline.findByPk(id, {
        include: {
          model: Airplane,
          as: "airplanes",
        },
      });

      if (!airline)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Airline not Found");

      return apiResponse(status.OK, "OK", "Success to get an Airline", {
        airline,
      });
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
  getAirlines: async (req) => {
    try {
      const airlines = await Airline.findAll();

      if (!airlines)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Airlines not found",
          []
        );

      return apiResponse(status.OK, "OK", "Success to get all Airlines", {
        airlines,
      });
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
  updateAirline: async (req) => {
    try {
      const { name, logo, iata } = req.body;
      const { id } = req.params;

      const airline = await Airline.findByPk(id);
      if (!airline) {
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Airline not found");
      }

      const slug = name ? name.toLowerCase().split(" ").join("-") : undefined;
      await airline.update({
        name: name ? name.toUpperCase() : undefined,
        logo,
        slug,
        airlineIata: iata ? iata.toUpperCase() : undefined,
      });

      return apiResponse(status.OK, "OK", "Succes to update an Airline");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
  deleteAirline: async (req) => {
    try {
      const { id } = req.params;
      const airline = await Airline.findByPk(id, {
        include: {
          model: Airplane,
          as: "airplanes",
        },
      });
      if (!airline)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Airline not found");

      const { airplanes } = airline;

      if (airplanes.length > 0) {
        throw apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "failed to delete Airline because the Airline is still associated with some Airplanes"
        );
      }

      await airline.destroy();

      return apiResponse(status.OK, "OK", "Success to deleted a Airline");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
};
