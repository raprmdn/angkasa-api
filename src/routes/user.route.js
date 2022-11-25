const express = require("express");
const userController = require("../controllers/user.controller");
const userValidation = require("../utils/validation/user.validation");
const {
  authentication,
} = require("../middlewares/authentication.middleware");

const router = express.Router();

router.post("/register", userValidation.register, userController.register);
router.post("/login", userValidation.login, userController.login);
router.get("/me", authentication, userController.me);

module.exports = router;
