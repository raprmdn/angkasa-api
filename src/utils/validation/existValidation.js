const Joi = require("joi");
const {
  User,
  Role,
  Airline,
  Benefit,
  SeatClassBenefit,
} = require("../../models");

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
  isUsernameExist: async (username) => {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
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
};
