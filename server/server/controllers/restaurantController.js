const menuItemModel = require("../models/menuItemModel");

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
      res.status(422).json({ message: "Restaurant doesn't have any MenuItems" });
    } else {
      res.status(200).json(allMenuItems);
    }
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
    res.status(200).json(singleMenuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// filter MenuItems based on query w/pagination
const filterRestaurantMenuItems = async (req, res) => {
  const { filterSelected } = req.query;
  const { resId } = req.params;
  const page = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.offset) || 10;
  try {
    const filteredItems = await menuItemModel
      .find({
        $and: [{ restaurant: resId, type: filterSelected }],
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
  const { query, pageNum, offset } = req.query;
  const page = parseInt(pageNum) || 0;
  const itemsPerPage = parseInt(offset) || 10;
  try {
    const searchResult = await menuItemModel
      .find({
        $or: [
          { type: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
        ],
      })
      .skip(page * itemsPerPage)
      .limit(itemsPerPage);
    res.status(200).json(searchResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRestaurantMenuItems,
  getOneRestaurantMenuItem,
  filterRestaurantMenuItems,
  searchRestaurantMenuItems,
};
