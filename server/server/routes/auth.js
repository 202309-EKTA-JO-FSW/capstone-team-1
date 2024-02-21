const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// User auth
// router.post("/login", authController.login);
router.post("/signup", authController.signup);

// router.get("/logout", authController.Logout);

module.exports = router;
