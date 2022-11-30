const express = require('express');
const googleLogin = require('./google.route')
const UserRouter = require("./user.route");
const RoleRouter = require("./role.route")

const router = express.Router();

router.use('/login/google', googleLogin);
router.use("/", UserRouter);
router.use('/role', RoleRouter);

module.exports = router;
