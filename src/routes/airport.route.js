const express = require('express');
const AirportController = require('../controllers/airport.controller');
const { authentication } = require('../middlewares/authentication.middleware');
const { hasRole } = require('../middlewares/authorization.middleware');
const { airportValidation, searchAirportValidation } = require('../utils/validation/aiport.validation');

const router = express.Router();

router.get('/search', searchAirportValidation, AirportController.findAirport);
router.get('/popular', AirportController.popularAirports);
router.post('/', authentication, hasRole(['ADMIN']), airportValidation, AirportController.create);
router.get('/:id', authentication, hasRole(['ADMIN']), AirportController.show);
router.put('/:id', authentication, hasRole(['ADMIN']), airportValidation, AirportController.update);
router.delete('/:id', authentication, hasRole(['ADMIN']), AirportController.delete);

module.exports = router;
