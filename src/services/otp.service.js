const moment = require('moment');
const { User, Otp } = require('../models');
const { apiResponse, apiBadRequestResponse, apiNotFoundResponse } = require('../utils/apiResponse.utils');
const { StatusCodes: status } = require('http-status-codes');
const { generateRandomOTP, hashOTP, verifyOTP} = require('../utils/otp.utils');
const { SendEmailVerificationOTP, SendResetPasswordOTP } = require('../helpers/mail.helper');
const { hashPassword } = require('../utils/bcrypt.utils');

const _extractedVerifyOTP = async (otp, email) => {
    const resetPasswordOTP = await Otp.findOne({ where: { email: email, otpType: 'RESET_PASSWORD' } });
    if (!resetPasswordOTP) {
        throw apiBadRequestResponse('Invalid or expired OTP')
    }

    if (resetPasswordOTP.expirationTime < moment.now()) {
        await resetPasswordOTP.destroy();
        throw apiBadRequestResponse('Invalid or expired OTP')
    }

    const isOTPMatch = await verifyOTP(otp, resetPasswordOTP.otp);
    if (!isOTPMatch) {
        throw apiBadRequestResponse('Invalid or expired OTP')
    }

    return resetPasswordOTP;
}

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
    },
    requestResetPassword: async (req) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw apiResponse(status.OK, 'OK', 'OTP Code for reset password has been sent to your email');
            }

            const userHasResetPasswordOTP = await Otp.findOne({ where: { email: user.email, otpType: 'RESET_PASSWORD' } });
            if (userHasResetPasswordOTP) {
                await userHasResetPasswordOTP.destroy()
            }

            const randomOTP = generateRandomOTP();
            const hashedOTP = await hashOTP(randomOTP);
            await Otp.create({
                email: user.email,
                otp: hashedOTP,
                otpType: 'RESET_PASSWORD',
                expirationTime: 10,
            });
            await SendResetPasswordOTP({ email: user.email, fullname: user.fullname, otp: randomOTP });

            return apiResponse(status.OK, 'OK', 'OTP Code for reset password has been sent to your email');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || "INTERNAL_SERVER_ERROR", e.message);
        }
    },
    verifyUserResetPasswordOTP: async (req) => {
        try {
            const { otp, email } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw apiNotFoundResponse('User not found');
            }

            await _extractedVerifyOTP(otp, user.email);

            return apiResponse(status.OK, 'OK', 'OTP is valid. Please proceed to reset password');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || "INTERNAL_SERVER_ERROR", e.message);
        }
    },
    resetPassword: async (req) => {
        try {
            const { otp, email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw apiNotFoundResponse('User not found');
            }

            const resetPasswordOTP = await _extractedVerifyOTP(otp, user.email);
            const hashedPassword = await hashPassword(password);
            await user.update({ password: hashedPassword });
            await resetPasswordOTP.destroy();

            return apiResponse(status.OK, 'OK', 'Successfully reset the password');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || "INTERNAL_SERVER_ERROR", e.message);
        }
    }
};
