const express = require('express');
const OrderController = require('../controllers/order.controller');
const { authentication } = require("../middlewares/authentication.middleware");
const { createOrderValidation } = require("../utils/validation/order.validation");

const router = express.Router();

router.post('/', authentication, createOrderValidation, OrderController.create);

module.exports = router;
