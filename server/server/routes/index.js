const express = require("express");
const router = express.Router();
const adminRoute = require("./admin");
const customerRoute = require("./customer");
const restaurantRoute = require("./restaurant");
const authRoute = require("./auth");
const userRoute = require("./user");

router.use("/admin", adminRoute);
router.use("/customer", customerRoute);
router.use("/restaurant", restaurantRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);

// test route
const testRoute = require("./testRoutes");
router.use("/", testRoute);
module.exports = router;
