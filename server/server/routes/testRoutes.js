const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const MenuItem = require("../models/menuItemModel");

// User auth
router.get("/restaurant", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/menuItem", async (req, res) => {
  try {
    const menuItem = await MenuItem.find();
    res.status(200).json(menuItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/menuItem/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    res.status(200).json(menuItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
