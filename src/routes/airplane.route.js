const express = require("express");
const AirplaneController = require("../controllers/airplane.controller");

const router = express.Router();

router.get("/:id", AirplaneController.show);

module.exports = router;
