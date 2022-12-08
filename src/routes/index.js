const express = require('express');
const googleLogin = require('./google.route')
const UserRouter = require("./user.route");
const OTPRouter = require("./otp.route");
const RoleRouter = require("./role.route")
const AirlineRouter = require("./airline.route");

const router = express.Router();

router.use('/login/google', googleLogin);
router.use("/", UserRouter);
router.use('/', OTPRouter);
router.use('/role', RoleRouter);
router.use('/airline', AirlineRouter);

module.exports = router;
