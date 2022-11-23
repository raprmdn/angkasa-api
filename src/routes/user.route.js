const express = require("express");
const userController = require("../controllers/user.controller");
const userValidation = require("../utils/validation/user.validation");

const router = express.Router();

// Register
router.post("/register", userValidation.register, userController.register);

module.exports = router;
