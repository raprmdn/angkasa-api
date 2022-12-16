const express = require('express');
const FlightController = require('../controllers/flight.controller');
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRole } = require("../middlewares/authorization.middleware");
const { flightValidation, searchFlightValidation, changeSeatPriceValidation } = require("../utils/validation/flight.validation");

const router = express.Router();

router.get('/', FlightController.index);
router.post('/', authentication, hasRole(['ADMIN']), flightValidation, FlightController.create);
router.get('/search', searchFlightValidation, FlightController.search);
router.get('/:id', FlightController.show);
router.put('/:id/change-seat-price', authentication, hasRole(['ADMIN']), changeSeatPriceValidation, FlightController.changeSeatPrice);


module.exports = router;
