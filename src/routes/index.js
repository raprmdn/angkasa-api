const express = require('express');
const googleLogin = require('./google.route')
const UserRouter = require("./user.route");
const OTPRouter = require("./otp.route");

const router = express.Router();

router.use('/login/google', googleLogin);
router.use("/", UserRouter);
router.use('/', OTPRouter);

module.exports = router;
