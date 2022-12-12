const express = require("express");
const userController = require("../controllers/user.controller");
const userValidation = require("../utils/validation/user.validation");
const { authentication } = require("../middlewares/authentication.middleware");

const router = express.Router();

router.post("/register", userValidation.register, userController.register);
router.post("/login", userValidation.login, userController.login);
router.get("/me", authentication, userController.me);
router.post(
  "/update-profile",
  authentication,
  userValidation.updateProfile,
  userController.updateProfile
);
router.post(
  "/update-password",
  authentication,
  userValidation.updatePassword,
  userController.updatePassword
);

module.exports = router;
