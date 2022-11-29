const express = require('express');
const { authentication } = require('../middlewares/authentication.middleware');
const { verifyUserEmailOTPValidation } = require('../utils/validation/otp.validation');
const OTPController = require('../controllers/otp.controller');

const router = express.Router();

router.post('/request-email-verification', authentication, OTPController.requestEmailVerification);
router.post('/verify/otp/email', authentication, verifyUserEmailOTPValidation, OTPController.verifyUserEmailOTP);

module.exports = router;
