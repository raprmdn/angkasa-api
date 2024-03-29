const Joi = require("joi");
const {
  User,
  Role,
  Airline,
  Benefit,
  SeatClass,
  SeatClassBenefit,
  Airplane,
} = require("../../models");
const fetch = require("node-fetch");
const { apiResponse, apiNotFoundResponse } = require("../apiResponse.utils");
const { StatusCodes: status } = require("http-status-codes");

const customThrowErrorJoiString = (msg, field) => {
  throw new Joi.ValidationError(
    msg,
    [
      {
        message: msg,
        path: [field],
        type: `string.${field}`,
        context: {
          key: field,
          label: field,
          field,
        },
      },
    ],
    field
  );
};

module.exports = {
  isUsernameExist: async (username, id = null) => {
    const user = await User.findOne({ where: { username: username } });
    if (user && user.id !== id) {
      customThrowErrorJoiString("Username already exist", "username");
    }

    return true;
  },
  isEmailExist: async (email) => {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      customThrowErrorJoiString("Email already exist", "email");
    }
    return true;
  },
  isRoleNameExist: async (roleName, id = null) => {
    const role = await Role.findOne({
      where: { name: roleName.toUpperCase() },
    });
    if (role && role.id !== +id) {
      customThrowErrorJoiString("Role name already exist", "name");
    }
    return true;
  },
  isAirlineNameExist: async (airlineName, id = null) => {
    if (airlineName) {
      const airline = await Airline.findOne({
        where: { name: airlineName.toUpperCase() },
      });
      if (airline && airline.id !== +id) {
        customThrowErrorJoiString("Airline name already exist", "name");
      }
    }
  },
  isAirlineIataExist: async (airlineIata, id = null) => {
    if (airlineIata) {
      const airline = await Airline.findOne({
        where: { airlineIata: airlineIata.toUpperCase() },
      });
      if (airline && airline.id !== +id) {
        customThrowErrorJoiString("Airline IATA already exist", "iata");
      }
    }
  },
  isBenefitNameExist: async (benefitName, id = null) => {
    if (benefitName) {
      const benefit = await Benefit.findOne({
        where: {
          name: benefitName.toUpperCase(),
        },
      });
      if (benefit && benefit.id !== +id) {
        customThrowErrorJoiString("Benefit name already exist", "name");
      }
    }
  },
  isBenefitAvailable: async (benefitId) => {
    const benefit = await Benefit.findOne({
      where: {
        id: benefitId,
      },
    });
    if (!benefit) {
      customThrowErrorJoiString("Benefit doesn't exist", "benefit");
    }
    return true;
  },
  isSeatClassAvailable: async (seatClassId) => {
    const seatClass = await SeatClass.findOne({
      where: {
        id: seatClassId,
      },
    });
    if (!seatClass) {
      customThrowErrorJoiString("Seat Class doesn't exist", "seatClass");
    }
    return true;
  },
  isSeatClassBenefitExist: async (benefitId, seatClassId) => {
    const seatClassBenefit = await SeatClassBenefit.findOne({
      where: { seatClassId: seatClassId, benefitId: benefitId },
    });
    if (seatClassBenefit) {
      customThrowErrorJoiString(
        "Seat class already have benefits",
        "benefitId"
      );
    }
    return true;
  },
  isAirplaneCodeExists: async (airplaneCode, id = null) => {
    const airplane = await Airplane.findOne({
      where: { airplaneCode: airplaneCode }
    });

    if (airplane && airplane.id !== +id) {
      customThrowErrorJoiString("Airplane code already exists", "airplaneCode");
    }

    return true;
  },
  isExistsIata: async (req, iata, label) => {
    try {
      const res = await fetch(`https://port-api.com/airport/iata/${iata}`, {
        method: "GET",
        timeout: 10000,
      }).catch((e) => {
        console.error(`Error fetching airport on port-api.com: ${e}`);
        if (e.type === 'request-timeout') {
          throw apiResponse(status.REQUEST_TIMEOUT, 'REQUEST_TIMEOUT', e.message);
        }

        throw apiResponse(status.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', e.message);
      });

      if (res.status !== 200) {
        throw apiNotFoundResponse(`Airport with IATA '${iata}' not found`)
      }

      if (label === 'from') {
        req.airportFrom = await res.json();
      }
      if (label === 'to') {
        req.airportTo = await res.json();
      }

      return true;
    } catch (e) {
      throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
    }
  }
};
