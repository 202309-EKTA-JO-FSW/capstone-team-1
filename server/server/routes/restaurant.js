const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const authUser = require("../middleware/authUser");
// restaurant
router.get("/", authUser, restaurantController.getAllRestaurants);
router.get("/search", authUser, restaurantController.searchRestaurant);
router.get("/filter", authUser, restaurantController.filterRestaurant);
router.get("/:resId", restaurantController.getOneRestaurant);

// menuItems
router.get("/:resId/menuItems", restaurantController.getAllRestaurantMenuItems);
router.get(
  "/:resId/menuItem/:itemId",
  restaurantController.getOneRestaurantMenuItem
);
router.get(
  "/:resId/menuItems/filter",
  restaurantController.filterRestaurantMenuItems
);
router.get(
  "/:resId/menuItems/search",
  restaurantController.searchRestaurantMenuItems
);

module.exports = router;
