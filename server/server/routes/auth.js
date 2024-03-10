const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const googleAuthController = require("../controllers/googleAuthController");

// User auth
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/logout", authController.logout);

// google auth
router.use("/", googleAuthController);

module.exports = router;
