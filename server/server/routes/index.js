const express = require("express");
const router = express.Router();
const adminRoute = require("./admin");
const customerRoute = require("./customer");
const restaurantRoute = require("./restaurant");
const authRoute = require("./auth");

router.use("/admin", adminRoute);
router.use("/customer", customerRoute);
router.use("/restaurant", restaurantRoute);
router.use("/auth", authRoute);

module.exports = router;
