const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// cart
// router.post("/cart", customerController.newCart);
// router.put("/cart/:cartId", customerController.updateCart);
// router.delete("/cart/:cartId", customerController.cancelCart);

// checkout
// router.post("/checkout", customerController.checkout);
// router.put("/checkout/:checkoutId", customerController.updateCheckout);
// router.delete("/checkout/:checkoutId", customerController.cancelCheckout);

module.exports = router;
