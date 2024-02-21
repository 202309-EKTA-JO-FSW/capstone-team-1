const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/userModel");

// User auth
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/logout", authController.logout);

// test route
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {}
});

module.exports = router;
