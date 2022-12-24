const express = require('express');
const OrderController = require('../controllers/order.controller');
const { authentication } = require("../middlewares/authentication.middleware");
const { createOrderValidation, indexOrderValidation } = require("../utils/validation/order.validation");
const { hasRole } = require("../middlewares/authorization.middleware");

const router = express.Router();

router.get('/history', authentication, hasRole(['USER']), OrderController.userOrderHistory);
router.get('/', authentication, hasRole(['ADMIN']), indexOrderValidation, OrderController.index);
router.post('/', authentication, createOrderValidation, OrderController.create);
router.get('/:identifier', authentication, OrderController.show);
router.put('/accept/:id', authentication, hasRole(['ADMIN']), OrderController.acceptOrder);

module.exports = router;
