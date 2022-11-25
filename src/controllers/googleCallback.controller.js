const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { google } = require("../config/oauth.config");
const {
  generateOAuthUsername,
  generateOAuthPassword,
} = require("../helpers/oauth.helper");

module.exports = {
  googleLogin: async (req, res) => {
    try {
      const { credential } = req.body;
      if (!credential)
        throw {
          code: 400,
          status: "BAD_REQUEST",
          message: "Credential is required",
        };

      const ticket = await google
        .verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then((data) => data)
        .catch((error) => {
          throw {
            code: 400,
            status: "BAD_REQUEST",
            message: "Invalid Credential",
          };
        });
      const payload = ticket.getPayload();
      const user = await Users.findOne({
        where: { email: payload.email },
        include: "role",
      });
      if (!user) {
        const username = generateOAuthUsername(payload.name);
        const password = await generateOAuthPassword(payload.email);
        const data = {
          fullname: payload.name,
          username,
          email: payload.email,
          password,
          emailVerifiedAt: new Date().toISOString(),
          roleId: 1,
          provider: "google",
          providerId: payload.sub,
          avatar: payload.picture,
        };
        const newUser = await Users.create(data);
        const userPayload = {
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          id: newUser.id,
        };

        const token = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, {
          expiresIn: "15m",
        });

        newUser.password = undefined;

        return res.status(200).json({
          code: 200,
          status: "OK",
          message: "Success authorized with Google Account",
          data: {
            user: {
              id: newUser.id,
              fullname: newUser.fullname,
              username: newUser.username,
              email: newUser.email,
              role: newUser.role,
              provider: newUser.provider,
              avatar: newUser.avatar,
              emailVerifiedAt: null,
              createdAt: newUser.createdAt,
              updatedAt: newUser.updatedAt,
            },
            token,
          },
        });
      }

      if (user.provider !== "google")
        throw {
          code: 400,
          status: "BAD_REQUEST",
          message:
            "Failed to authenticated user, the email has already related to another account",
        };
      const userPayload = {
        name: user.name,
        email: user.email,
        username: user.username,
        id: user.id,
      };

      const token = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
      });

      user.password = undefined;
      return res.status(200).json({
        code: 200,
        status: "OK",
        message: "Success authorized with Google Account",
        data: {
          user: {
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            role: user.role.name,
            provider: user.provider,
            avatar: user.avatar,
            emailVerifiedAt: user.emailVerifiedAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          token,
        },
      });
    } catch (error) {
      if (!error.code) {
        return res.status(400).json({
          code: 400,
          status: "BAD_REQUEST",
        });
      }
      return res.status(error.code).json({
        code: error.code,
        status: error.status,
        message: error.message,
      });
    }
  },
};
