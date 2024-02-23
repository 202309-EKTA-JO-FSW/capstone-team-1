const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const Restaurant = require("../models/restaurantModel");
const userModel = require("../models/userModel");
const authUser = require("../middleware/authUser");
const { uploadMulter } = require("../middleware/multer");

router.use(authUser);
// add multer in middleware to track the file comes from request
// multer arg should be change according to what the fild of the image
router.use(uploadMulter.single("image"));

// restaurant
// router.get("/restaurant/:resId", adminController.getAdminRestaurant);
// router.put("/restaurant/:resId", adminController.updateAdminRestaurant);

// items
router.post("/restaurant/menuItem/new", adminController.addNewItem);
// router.put("/restaurant/:resId/menuItem/:itemId", adminController.updateItem);
// router.delete(
//   "/restaurant/:resId/menuItem/:itemId",
//   adminController.deleteItem
// );

// router.post("/restaurant/new", async (req, res) => {
//   try {
//     // Extract restaurant details from the request body
//     const user = await userModel.findById(req.userId);
//     const { name, description, cuisine, contact, profile_image, address } =
//       req.body;

//     // Create a new restaurant instance
//     const newRestaurant = new Restaurant({
//       name,
//       description,
//       cuisine,
//       contact,
//       profile_image,
//       address,
//       owner: user._id,
//     });

//     // Save the new restaurant to the database
//     await newRestaurant.save();

//     user.restaurant = newRestaurant._id;
//     await user.save();
//     // Send a success response
//     res.status(201).json({
//       message: "Restaurant created successfully",
//       restaurant: newRestaurant,
//     });
//   } catch (error) {
//     // Handle errors
//     console.error("Error creating restaurant:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to create restaurant", error: error.message });
//   }
// });

module.exports = router;
