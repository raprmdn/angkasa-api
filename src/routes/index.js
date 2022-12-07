const express = require('express');
const googleLogin = require('./google.route')
const UserRouter = require("./user.route");
const OTPRouter = require("./otp.route");
const RoleRouter = require("./role.route")
const AirportRouter = require("./airport.route");

const router = express.Router();

router.use('/login/google', googleLogin);
router.use("/", UserRouter);
router.use('/', OTPRouter);
router.use('/role', RoleRouter);
router.use('/airports', AirportRouter);

module.exports = router;
