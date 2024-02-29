const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authUser = require("../middleware/authUser");
router.use(authUser);
// profile
router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.updateUserProfile);

module.exports = router;
