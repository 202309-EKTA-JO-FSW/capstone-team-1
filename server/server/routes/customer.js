const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

const authUser = require("../middleware/authUser");

// add auth user in middleware to authorize the user
router.use(authUser);

// cart
router.get("/cart", customerController.getCart);
router.post("/cart", customerController.newCart);
router.put("/cart/:itemId", customerController.updateCart);
router.delete("/cart", customerController.cancelCart);

// checkout
router.post("/checkout", customerController.checkout);
router.put("/checkout/:checkoutId", customerController.processCheckout);
router.delete("/checkout/:checkoutId", customerController.cancelCheckout);

// order
router.get("/orders", customerController.getOrders);
router.get("/order/:orderId", customerController.getSingleOrder);

module.exports = router;
