const restaurantModel = require("../models/restaurantModel");
const menuItemModel = require("../models/menuItemModel");

// get all MenuItems for chosen restaurant
const getAllRestaurantMenuItems = async (req, res) => {
  const { resId } = req.params;
  const page = req.query.page || 0;
  const itemsPerPage = 10;
  try {
    const allMenuItems = await restaurantModel
      .findById(resId)
      .populate({ path: "menuItems", options :{
        skip: page*itemsPerPage, 
        limit: itemsPerPage
      }});
    if (!allMenuItems) {
      res.status(422).json({ message: "Restaurant doesn't have any Items" });
    } else {
      res.json(allMenuItems);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getOneRestaurantMenuItem = async (req, res) => {
  const { resId } = req.params.resId;
  const { itemId } = req.params.itemId;
  try {
    const restaurantRequested = await restaurantModel.findById({ resId });
    if (restaurantRequested.menuItems) {
      const oneMenuItem = await menuItemModel.findById({ itemId });
      res.status(200).json(oneMenuItem);
    } else {
      res.status(422).json({ message: err.message });
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
module.exports = {
  getAllRestaurantMenuItems,
  getOneRestaurantMenuItem,
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
