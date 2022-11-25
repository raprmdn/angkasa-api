const { User, Role } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { hashPassword, checkPassword } = require("../utils/bcrypt.utils");
const { generateToken } = require("../utils/jwt.utils");
const { UserTransform } = require("../helpers/transformers/user.transformers");

module.exports = {
  register: async (req) => {
    try {
      const { fullname, username, email, password } = req.body;
      const role = await Role.findOne({ where: { name: "USER" } });
      const hashed = await hashPassword(password);

      await User.create({
        fullname,
        username,
        email,
        password: hashed,
        roleId: role.id,
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
      const user = await User.findOne({ where: { email: email }, include: "role" });
      if (!user) {
        return apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "These credentials does not match our records"
        );
      }

      const isPasswordValid = await checkPassword(password, user.password);
      if (!isPasswordValid) {
        return apiResponse(
          status.BAD_REQUEST,
          "BAD_REQUEST",
          "These credentials does not match our records"
        );
      }

      const token = generateToken(user);
      const userTransformed = UserTransform(user);

      return apiResponse(status.OK, "OK", "Success Login", {
        user: userTransformed,
        token,
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
      const user = await User.findByPk(id, { include: "role" });
      if (!user)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "User not found");

      const userTransformed = UserTransform(user);

      return apiResponse(status.OK, "OK", "Success get authenticated user", { user: userTransformed });
    } catch (e) {
      throw apiResponse(
        e.code || status.INTERNAL_SERVER_ERROR,
        e.status || "INTERNAL_SERVER_ERROR",
        e.message
      );
    }
  },
};
