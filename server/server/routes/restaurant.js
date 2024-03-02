const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");



// restaurant 
router.get("/", restaurantController.getAllRestaurants);
router.get("/:resId", restaurantController.getOneRestaurant);
router.get("/search", restaurantController.searchRestaurant);
router.get("/filter", restaurantController.filterRestaurant);


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

router.get("/", async (req, res) => {
  const restaurant = await Restuarnat.find();
  return res.json(restaurant);
});

module.exports = router;
