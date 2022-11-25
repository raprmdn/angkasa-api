const express = require('express');
const googleLogin = require('./google.route')
const UserRouter = require("./user.route");

const router = express.Router();

router.use('/login/google', googleLogin);
router.use("/", UserRouter);

module.exports = router;
