const { StatusCodes: status } = require('http-status-codes');
const { User, Role } = require("../models");
const { apiResponse } = require("../utils/apiResponse.utils");
const { google } = require("../config/oauth.config");
const { generateOAuthUsername, generateOAuthPassword } = require("../helpers/oauth.helper");
const { generateToken } = require("../utils/jwt.utils");
const { UserTransform } = require("../helpers/transformers/user.transformers");

module.exports = {
    googleLogin: async (req) => {
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
            const user = await User.findOne({
                where: { email: payload.email },
                include: "role",
            });
            const role = await Role.findOne({ where: { name: "USER" } });

            if (!user) {
                const username = generateOAuthUsername(payload.name);
                const password = await generateOAuthPassword(payload.email);

                const newUser = await User.create({
                    fullname: payload.name,
                    username,
                    email: payload.email,
                    password,
                    emailVerifiedAt: new Date().toISOString(),
                    roleId: role.id,
                    provider: "google",
                    providerId: payload.sub,
                    avatar: payload.picture,
                });
                newUser.role = { name: "USER" }

                const token = generateToken(newUser);
                const userTransform = UserTransform(newUser)

                return apiResponse(
                    status.OK,
                    'OK',
                    'Success authorized with Google Account',
                    { user: userTransform, token }
                );
            }

            if (user.provider !== "google")
                throw {
                    code: 400,
                    status: "BAD_REQUEST",
                    message:
                        "Failed to authenticated user, the email has already related to another account",
                };

            const token = generateToken(user);
            const userTransform = UserTransform(user)

            return apiResponse(
                status.OK,
                'OK',
                'Success authorized with Google Account',
                { user: userTransform, token }
            );
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
};
