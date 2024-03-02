const Restaurant = require("../models/restaurantModel");

// Get all restaurants with pagination
async function getAllRestaurants(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const restaurants = await Restaurant.find()
      .skip(skip)
      .limit(limit);
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a single restaurant by ID
async function getOneRestaurant(req, res) {
  const resId = req.params.resId;

  try {
    const restaurant = await Restaurant.findById(resId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Search for restaurants by name or cuisine with pagination
async function searchRestaurant(req, res) {
  const { search, page, limit } = req.query;
  const regex = new RegExp(search, "i");
  const pageNum = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (pageNum - 1) * pageSize;

  try {
    const restaurants = await Restaurant.find({
      $or: [{ name: regex }, { cuisine: regex }],
    })
      .skip(skip)
      .limit(pageSize);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Filter restaurants by cuisine with pagination
async function filterRestaurant(req, res) {
  const { cuisine, page, limit } = req.query;
  const pageNum = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (pageNum - 1) * pageSize;

  try {
    const restaurants = await Restaurant.find({ cuisine })
      .skip(skip)
      .limit(pageSize);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  searchRestaurant,
  filterRestaurant,
};
