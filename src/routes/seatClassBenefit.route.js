const express = require("express");
const router = express.Router();
const SCBController = require("../controllers/seatClassBenefit.controller");
const {
  seatClassBenefitCreateValidation,
} = require("../utils/validation/seatClassBenefit.validation");
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRole } = require("../middlewares/authorization.middleware");

router.get("/", SCBController.getSeatClassBenefits);
router.get("/benefit", SCBController.getSeatClass);
router.post(
  "/",
  authentication,
  hasRole(["ADMIN"]),
  seatClassBenefitCreateValidation,
  SCBController.createSeatClassBenefit
);

module.exports = router;
