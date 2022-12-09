const express = require('express');
const googleLogin = require('./google.route')
const UserRouter = require("./user.route");
const OTPRouter = require("./otp.route");
const RoleRouter = require("./role.route")
const AirportRouter = require("./airport.route");
const AirlineRouter = require("./airline.route");
const BenefitRouter = require("./benefit.route");

const router = express.Router();

router.use('/login/google', googleLogin);
router.use("/", UserRouter);
router.use('/', OTPRouter);
router.use('/role', RoleRouter);
router.use('/airports', AirportRouter);
router.use('/airline', AirlineRouter);
router.use('/benefit', BenefitRouter);

module.exports = router;
