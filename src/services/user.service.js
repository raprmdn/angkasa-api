const { Users } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const bcrypt = require("bcrypt");

// const { StatusCodes: status } = require("http-status-codes");

module.exports = {
  register: async (req) => {
    try {
      const { fullname, username, email, password } = req.body;
      // if (password !== confirmPassword) {
      //   return apiResponse(505, false, "Confirm your password!");
      // }
      const hashed = await bcrypt.hash(password, 10);
      await Users.create({ fullname, username, email, password: hashed });

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success create a new account"
      );
    } catch (err) {
      throw apiResponse(
        err.code || status.INTERNAL_SERVER_ERROR,
        err.status || "INTERNAL_SERVER_ERROR",
        err.message
      );
    }
  },
};
