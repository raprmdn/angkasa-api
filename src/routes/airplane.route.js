const express = require("express");
const AirplaneController = require("../controllers/airplane.controller");
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRole } = require("../middlewares/authorization.middleware");
const { airplaneValidation } = require("../utils/validation/airplane.validation");

const router = express.Router();

router.post("/", authentication, hasRole(['ADMIN']), airplaneValidation, AirplaneController.create);
router.get("/:id", AirplaneController.show);

module.exports = router;
