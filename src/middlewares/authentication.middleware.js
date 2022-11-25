const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const { verifyAccessToken } = require("../utils/jwt.utils");
const { Users, Roles } = require("../models");

module.exports = {
  authentication: async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token)
        throw apiResponse(
          status.UNAUTHORIZED,
          "UNAUTHORIZED",
          "Unauthorized. Please login to continue."
        );

      req.user = verifyAccessToken(token);

      next();
    } catch (e) {
      if (e.name === "JsonWebTokenError") {
        return res
          .status(status.UNAUTHORIZED)
          .json(
            apiResponse(
              status.UNAUTHORIZED,
              "UNAUTHORIZED",
              "Invalid token. Please login again."
            )
          );
      }
      if (e.name === "TokenExpiredError") {
        return res
          .status(status.UNAUTHORIZED)
          .json(
            apiResponse(
              status.UNAUTHORIZED,
              "UNAUTHORIZED",
              "Token expired. Please login again."
            )
          );
      }

      return res.status(e.code).json(e);
    }
  },
};
