const express = require("express");
const router = express.Router();
const {
  getAdminRestaurant,
  updateAdminRestaurant,
  createRestaurant,
} = require("../controllers/adminController");
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const authUser = require("../middleware/authUser");
jest.mock("../models/restaurantModel", () => ({
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  create: jest.fn(),
}));

jest.mock("../models/userModel", () => ({
  findById: jest.fn(),
}));
jest.mock("../middleware/authUser", () =>
  jest.fn((req, res, next) => {
    req.userId = "authenticatedUserId"; // Mock authenticated user ID
    next();
  })
);
describe("Admin Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAdminRestaurant", () => {
    test("should only allow authenticated users to get restaurant", async () => {
      const req = {
        headers: {
          Authorization: "Bearer adminToken",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAdminRestaurant(req, res);

      expect(User.findById).toHaveBeenCalledWith("authenticatedUserId");
      expect(Restaurant.findOne).toHaveBeenCalledWith({
        owner: "authenticatedUserId",
      });
    });
    test("should return 401 if user is not authenticated", async () => {
      const req = {
        headers: {
          Authorization: "Bearer invalidToken", // Invalid token or no token
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAdminRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    });
    test("should return the correct restaurant for the given userId", async () => {
      const userId = "adminUserId";
      const mockRestaurant = { name: "Mock Restaurant", owner: userId };
      Restaurant.findOne.mockResolvedValue(mockRestaurant);

      const req = { userId };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAdminRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ restaurant: mockRestaurant });
    });

    test("should return 404 if restaurant is not found", async () => {
      const req = {
        headers: {
          Authorization: "Bearer adminToken", // Add the token here
        },
        userId: "authenticatedUserId",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Restaurant.findOne.mockResolvedValue(null); // Simulate restaurant not found

      await getAdminRestaurant(req, res);

      expect(User.findById).toHaveBeenCalledWith("authenticatedUserId");
      expect(Restaurant.findOne).toHaveBeenCalledWith({
        owner: "authenticatedUserId",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Restaurant not found",
      });
    });

    test("should return 500 if an error occurs", async () => {
      const req = {
        headers: {
          Authorization: "Bearer adminToken", // Add the token here
        },
        userId: "authenticatedUserId",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Restaurant.findOne.mockRejectedValue(new Error("Database error")); // Simulate database error

      await getAdminRestaurant(req, res);

      expect(User.findById).toHaveBeenCalledWith("authenticatedUserId");
      expect(Restaurant.findOne).toHaveBeenCalledWith({
        owner: "authenticatedUserId",
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });
  describe("updateAdminRestaurant", () => {
    test("should update restaurant details", async () => {
      // Mock the findByIdAndUpdate function to return an updated restaurant
      const mockRestaurant = { name: "Updated Restaurant" };
      Restaurant.findByIdAndUpdate.mockResolvedValue(mockRestaurant);

      const req = {
        params: { resId: "restaurantId" },
        body: { name: "Updated Restaurant" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateAdminRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ restaurant: mockRestaurant });
    });

    test("should return 404 if restaurant not found", async () => {
      // Mock the findByIdAndUpdate function to return null (restaurant not found)
      Restaurant.findByIdAndUpdate.mockResolvedValue(null);

      const req = {
        params: { resId: "restaurantId" },
        body: { name: "Updated Restaurant" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateAdminRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Restaurant not found",
      });
    });

    test("should return 500 if an error occurs", async () => {
      // Mock the findByIdAndUpdate function to throw an error
      Restaurant.findByIdAndUpdate.mockRejectedValue(
        new Error("Database error")
      );

      const req = {
        params: { resId: "restaurantId" },
        body: { name: "Updated Restaurant" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateAdminRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });
});
