const express = require('express');
const FlightController = require('../controllers/flight.controller');
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRole } = require("../middlewares/authorization.middleware");
const { flightValidation, searchFlightValidation} = require("../utils/validation/flight.validation");

const router = express.Router();

router.get('/', FlightController.index);
router.post('/', authentication, hasRole(['ADMIN']),
    flightValidation, FlightController.create);
router.get('/search', searchFlightValidation, FlightController.search);

module.exports = router;
