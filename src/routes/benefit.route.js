const express = require("express");
const router = express.Router();
const BenefitController = require("../controllers/benefit.controller");
const {
  benefitCreateValidation,
  benefitUpdateValidation,
} = require("../utils/validation/benefit.validation");
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRole } = require("../middlewares/authorization.middleware");

router.get("/", BenefitController.getBenefits);
router.post(
  "/",
  authentication,
  hasRole(["ADMIN"]),
  benefitCreateValidation,
  BenefitController.createBenfit
);
router.get("/:id", BenefitController.showBenefit);
router.put(
  "/:id",
  authentication,
  hasRole(["ADMIN"]),
  benefitUpdateValidation,
  BenefitController.updateBenefit
);
router.delete(
  "/:id",
  authentication,
  hasRole(["ADMIN"]),
  BenefitController.deleteBenefit
);

module.exports = router;
