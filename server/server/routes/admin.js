const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authUser=require("../middleware/authUser");
router.use(authUser);

// restaurant
 router.post("/restaurant/new", adminController.createRestaurant);
 router.get("/restaurant", adminController.getAdminRestaurant);
 router.put("/restaurant", adminController.updateAdminRestaurant);

// items
// router.post("/restaurant/:resId/menuItem/new", adminController.addNewItem);
// router.put("/restaurant/:resId/menuItem/:itemId", adminController.updateItem);
// router.delete(
//   "/restaurant/:resId/menuItem/:itemId",
//   adminController.deleteItem
// );

module.exports = router;
