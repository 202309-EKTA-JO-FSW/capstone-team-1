const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authUser = require("../middleware/authUser");
const { uploadMulter } = require("../middleware/multer");

// add multer in middleware to track the file comes from request
// multer arg should be change according to what the fild of the image
router.use(uploadMulter.single("image"));
router.use(authUser);
// profile
router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.updateUserProfile);

module.exports = router;
