const restaurantModel = require("../models/restaurantModel");
const menuItemModel = require("../models/menuItemModel");

// get all MenuItems for chosen restaurant
const getAllRestaurantMenuItems = async (req, res) => {
  const { resId } = req.params;
  const page = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.offset) || 10;
  try {
    const allMenuItems = await menuItemModel
      .find({ "restaurant._id": resId })
      .skip(page * itemsPerPage)
      .limit(itemsPerPage);
    if (allMenuItems.length === 0) {
      res.status(422).json({ message: "Restaurant doesn't have any Items" });
    } else {
      res.json(allMenuItems);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getOneRestaurantMenuItem = async (req, res) => {
  const { resId, itemId } = req.params;
  try {
    const singleMenuItem = await menuItemModel.findOne({
      $and: [
        {
          _id: itemId,
          "restaurant._id": resId,
        },
      ],
    });
    if (!singleMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(singleMenuItem);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const filterRestaurantMenuItems = async (req, res) => {
  const { filterSelected } = req.query;
  const {resId}=req.params;
  try {
    const filteredItems = await menuItemModel.find({
      $and: [{ "restaurant._id": resId, filterSelected }],
    });
    res.status(200).json(filteredItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllRestaurantMenuItems,
  getOneRestaurantMenuItem,
  filterRestaurantMenuItems,
};

//router.get("/:resId/menuItems", restaurantController.getAllRestaurantMenuItems);
// router.get(
//   "/:resId/menuItems/:itemId",
//   restaurantController.getOneRestaurantMenuItem
// );
// router.get(
//   "/:resId/menuItems/filter",
//   restaurantController.filterRestaurantMenuItems
// );
// router.get(
//   "/:resId/menuItems/search",
//   restaurantController.searchRestaurantMenuItems
// );
