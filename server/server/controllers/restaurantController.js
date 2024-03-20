const Restaurant = require("../models/restaurantModel");
const menuItemModel = require("../models/menuItemModel");

// Get all restaurants with pagination
async function getAllRestaurants(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalRestaurants = await Restaurant.countDocuments();
    const totalPages = Math.ceil(totalRestaurants / limit);

    const restaurants = await Restaurant.find().skip(skip).limit(limit);

    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    res.status(200).json({
      restaurants,
      totalRestaurants,
      totalPages,
      currentPage: page,
    });
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
    const count = await Restaurant.countDocuments({
      $or: [{ name: regex }, { cuisine: regex }],
    });

    const totalPages = Math.ceil(count / pageSize);

    const restaurants = await Restaurant.find({
      $or: [{ name: regex }, { cuisine: regex }],
    })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({ restaurants, totalPages });
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

// get all MenuItems for chosen restaurant w/ pagination
const getAllRestaurantMenuItems = async (req, res) => {
  const { resId } = req.params;
  const page = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.offset) || 10;
  try {
    const allMenuItems = await menuItemModel
      .find({ restaurant: resId })
      .skip(page * itemsPerPage)
      .limit(itemsPerPage);

    if (allMenuItems.length === 0) {
      return res
        .status(404)
        .json({ message: "Restaurant doesn't have any MenuItems" });
    }
    return res.status(200).json(allMenuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get one MenuItem
const getOneRestaurantMenuItem = async (req, res) => {
  const { resId, itemId } = req.params;
  try {
    const singleMenuItem = await menuItemModel.findOne({
      _id: itemId,
      restaurant: resId,
    });
    if (!singleMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    return res.status(200).json(singleMenuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// filter MenuItems based on query w/pagination
const filterRestaurantMenuItems = async (req, res) => {
  const { type } = req.query;
  const { resId } = req.params;
  const page = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.offset) || 10;
  try {
    const filteredItems = await menuItemModel
      .find({
        restaurant: resId,
        type: type,
      })
      .skip(page * itemsPerPage)
      .limit(itemsPerPage);
    res.status(200).json(filteredItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// search MenuItems w/pagination
const searchRestaurantMenuItems = async (req, res) => {
  const { search, pageNum, offset } = req.query;
  const { resId } = req.params;
  const page = parseInt(pageNum) || 0;
  const itemsPerPage = parseInt(offset) || 10;
  try {
    const searchResult = await menuItemModel
      .find({
        $or: [
          { type: { $regex: search.toString(), $options: "i" } },
          { name: { $regex: search.toString(), $options: "i" } },
        ],
        restaurant: resId,
      })
      .skip(page * itemsPerPage)
      .limit(itemsPerPage);
    res.status(200).json(searchResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  searchRestaurant,
  filterRestaurant,
  getAllRestaurantMenuItems,
  getOneRestaurantMenuItem,
  filterRestaurantMenuItems,
  searchRestaurantMenuItems,
};
