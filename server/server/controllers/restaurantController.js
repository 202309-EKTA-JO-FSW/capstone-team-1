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
  const { name, type, pageNum, offset } = req.query;
  const page = parseInt(pageNum) || 0;
  const itemsPerPage = parseInt(offset) || 10;
  try {
    const queryConditions = {};

    if (type) {
      queryConditions.type = { $regex: type.toString(), $options: "i" };
    }

    if (name) {
      queryConditions.name = { $regex: name.toString(), $options: "i" };
    }

    const searchResult = await menuItemModel
      .find({
        $or: [queryConditions],
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
