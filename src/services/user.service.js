const { Users, Roles } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { hashPassword, checkPassword } = require("../utils/bcrypt.utils");
const { generateAccessToken } = require("../utils/jwt.utils");

module.exports = {
  register: async (req) => {
    try {
      const { fullname, username, email, password } = req.body;
      const userRole = await Roles.findOne({ where: { name: "user" } });
      const hashed = await hashPassword(password);

      await Users.create({
        fullname,
        username,
        email,
        password: hashed,
        roleId: userRole.id,
      });

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

  login: async (req) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email: email } });
      console.log(user);
      if (!user) {
        return apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "These credentials does not match our records"
        );
      }

      const isPasswordValid = checkPassword(password, user.password);
      if (!isPasswordValid) {
        return apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "These credentials does not match our records"
        );
      }

      // const isRoleIdValid = await Roles.findOne({ where: { id: user.roleId } });
      // if (!isRoleIdValid) {
      //   return apiResponse(
      //     status.BAD_REQUEST,
      //     "BAD_REQUEST",
      //     "These credentials does not match our records"
      //   );
      // }

      const accessToken = generateAccessToken(user);

      return apiResponse(status.OK, "OK", "Success Login", {
        user,
        accessToken,
      });
    } catch (err) {
      throw apiResponse(
        err.code || status.INTERNAL_SERVER_ERROR,
        err.status || "INTERNAL_SERVER_ERROR",
        err.message
      );
    }
  },
  me: async (req) => {
    try {
      const { id } = req.user;
      const user = await Users.findByPk(id);
      if (!user)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "User not found");
      user.password = undefined;

      return apiResponse(status.OK, "OK", "Success get user", { user });
    } catch (e) {
      throw apiResponse(
        e.code || status.INTERNAL_SERVER_ERROR,
        e.status || "INTERNAL_SERVER_ERROR",
        e.message
      );
    }
  },
};
