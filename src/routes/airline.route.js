const express = require("express");
const router = express.Router();
const AirlineController = require("../controllers/airline.controller");
const {
  airlineCreateValidation,
  airlineUpdateValidation,
} = require("../utils/validation/airline.validation");
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRole } = require("../middlewares/authorization.middleware");

router.get("/", AirlineController.getAirlines);
router.post(
  "/",
  authentication,
  hasRole(["ADMIN"]),
  airlineCreateValidation,
  AirlineController.createAirline
);
router.get("/:id", AirlineController.showAirline);
router.put(
  "/:id",
  authentication,
  hasRole(["ADMIN"]),
  airlineUpdateValidation,
  AirlineController.updateAirline
);
router.delete(
  "/:id",
  authentication,
  hasRole(["ADMIN"]),
  AirlineController.deleteAirline
);

module.exports = router;
