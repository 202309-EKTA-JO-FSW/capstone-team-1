const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// admin auth
// router.post("/admin/login", authController.adminLogin);
// router.post("/admin/signup", authController.adminSignup);

// router.get("/admin/logout", authController.adminLogout);

// customer auth
// router.post("/customer/login", authController.customerLogin);
// router.post("/customer/signup", authController.customerSignup);

// router.get("/customer/logout", authController.customerLogout);

module.exports = router;
