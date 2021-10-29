const express = require('express');
const checkoutController = require('../controller/checkoutController');
const router = express.Router();

router.get(
    '/checkout-session',
    checkoutController.getCheckoutSession
);


module.exports = router;
