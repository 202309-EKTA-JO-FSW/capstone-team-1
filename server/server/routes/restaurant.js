const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

// restaurant 
// router.get("/", restaurantController.getAllRestaurants);

// router.get("/:resId", restaurantController.getOneRestaurant);
// router.get("/search", restaurantController.searchRestaurant);
// router.get("/filter", restaurantController.filterRestaurant);

// menuItems
// router.get("/:resId/menuItems", restaurantController.getAllRestaurantMenuItems);
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

module.exports = router;
