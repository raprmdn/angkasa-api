const express = require('express');
const { authentication } = require('../middlewares/authentication.middleware');
const OTPController = require('../controllers/otp.controller');
const {
    verifyUserEmailOTPValidation,
    requestResetPasswordValidation,
    verifyResetPasswordOTPValidation,
    resetPasswordValidation,
} = require('../utils/validation/otp.validation');

const router = express.Router();

router.post('/request-email-verification', authentication, OTPController.requestEmailVerification);
router.post('/verify/otp/email', authentication, verifyUserEmailOTPValidation, OTPController.verifyUserEmailOTP);

router.post('/reset-password/request', requestResetPasswordValidation, OTPController.requestResetPassword);
router.post('/verify/otp/reset-password', verifyResetPasswordOTPValidation, OTPController.verifyUserResetPasswordOTP);
router.post('/reset-password', resetPasswordValidation, OTPController.resetPassword);

module.exports = router;
