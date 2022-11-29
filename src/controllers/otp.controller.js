const OTPService = require('../services/otp.service');

module.exports = {
    requestEmailVerification: async (req, res) => {
        try {
            const serviceResponse = await OTPService.requestEmailVerification(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    verifyUserEmailOTP: async (req, res) => {
        try {
            const serviceResponse = await OTPService.verifyUserEmailOTP(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
