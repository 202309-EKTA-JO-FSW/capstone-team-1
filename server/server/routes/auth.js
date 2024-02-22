const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/userModel");
const authUser = require("../middleware/authUser");

// User auth
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/logout", authController.logout);

module.exports = router;
