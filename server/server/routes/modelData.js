const express = require("express");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const router = express.Router();

// User
router.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// restaurant
router.get("/restaurant", async (req, res) => {
  try {
    const restaurant = await Restaurant.find({});
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
