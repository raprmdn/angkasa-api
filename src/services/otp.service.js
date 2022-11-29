const moment = require('moment');
const { User, Otp } = require('../models');
const { apiResponse, apiBadRequestResponse, apiNotFoundResponse } = require('../utils/apiResponse.utils');
const { StatusCodes: status } = require('http-status-codes');
const { generateRandomOTP, hashOTP, verifyOTP} = require('../utils/otp.utils');
const { SendEmailVerificationOTP } = require('../helpers/mail.helper');

module.exports = {
    requestEmailVerification: async (req) => {
        try {
            const { email } = req.user;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw apiResponse(status.OK, 'OK', 'OTP Code for email verification has been sent to your email');
            }

            if (user.emailVerifiedAt) {
                throw apiBadRequestResponse('Your email has already been verified');
            }

            const userHasReqEmailOTP = await Otp.findOne({ where: { email: user.email, otpType: 'EMAIL_VERIFICATION' } });
            if (userHasReqEmailOTP) {
                await userHasReqEmailOTP.destroy()
            }

            const randomOTP = generateRandomOTP();
            const hashedOTP = await hashOTP(randomOTP);
            await Otp.create({
                email: user.email,
                otp: hashedOTP,
                otpType: 'EMAIL_VERIFICATION',
                expirationTime: 10,
            });
            await SendEmailVerificationOTP({ email: user.email, fullname: user.fullname, otp: randomOTP });

            return apiResponse(status.OK, 'OK', 'OTP Code for email verification has been sent to your email');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || "INTERNAL_SERVER_ERROR", e.message);
        }
    },
    verifyUserEmailOTP: async (req) => {
        try {
            const { email } = req.user;
            const { otp } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw apiNotFoundResponse('User not found');
            }

            const emailVerificationOTP = await Otp.findOne({ where: { email: user.email, otpType: 'EMAIL_VERIFICATION' } });
            if (!emailVerificationOTP) {
                throw apiBadRequestResponse('Invalid or expired OTP')
            }

            if (emailVerificationOTP.expirationTime < moment.now()) {
                await emailVerificationOTP.destroy();
                throw apiBadRequestResponse('Invalid or expired OTP')
            }

            const isOTPMatch = await verifyOTP(otp, emailVerificationOTP.otp);
            if (!isOTPMatch) {
                throw apiBadRequestResponse('Invalid or expired OTP')
            }

            await emailVerificationOTP.destroy();
            await user.update({ emailVerifiedAt: moment.now() });

            return apiResponse(status.OK, 'OK', 'Successfully verified the email');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || "INTERNAL_SERVER_ERROR", e.message);
        }
    }
};
