const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authUser = require("../middleware/authUser");
const { uploadMulter } = require("../middleware/multer");

// add multer in middleware to track the file comes from request
// multer arg should be change according to what the fild of the image
router.use(uploadMulter.single("image"));

// add auth user in middleware to authorize the user
router.use(authUser);

// restaurant
// router.get("/restaurant/:resId", adminController.getAdminRestaurant);
// router.put("/restaurant/:resId", adminController.updateAdminRestaurant);

// menuItems
router.post("/restaurant/menuItem/new", adminController.addNewItem);
router.put("/restaurant/menuItem/:itemId", adminController.updateItem);
router.delete("/restaurant/menuItem/:itemId", adminController.deleteItem);

module.exports = router;
