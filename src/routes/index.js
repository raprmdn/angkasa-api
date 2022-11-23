const express = require("express");
const UserRouter = require("./user.route");

const router = express.Router();

router.use("/", UserRouter);

module.exports = router;
