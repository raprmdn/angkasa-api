const googleLogin = require('./google.route')
const UserRouter = require("./user.route");
const express = require('express');

const router = express.Router();

router.use('/login/google', googleLogin);
router.use("/", UserRouter);

module.exports = router;
