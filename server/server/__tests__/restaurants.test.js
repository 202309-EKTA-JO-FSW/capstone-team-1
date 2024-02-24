const restaurantController = require("../controllers/restaurantController");

describe("Restaurant Controller", () => {
  describe("getAllRestaurants", () => {
    it("should return all restaurants", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await restaurantController.getAllRestaurants(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("getOneRestaurant", () => {
    it("should return a single restaurant by ID", async () => {
      const req = { params: { resId: "some_valid_id" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await restaurantController.getOneRestaurant(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    it("should return 404 if restaurant ID is invalid", async () => {
      const req = { params: { resId: "invalid_id" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await restaurantController.getOneRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Restaurant not found" });
    });
  });

  describe("searchRestaurant", () => {
    it("should return restaurants matching the search query", async () => {
      const req = { query: { query: "italian", page: 1, limit: 10 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await restaurantController.searchRestaurant(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("filterRestaurant", () => {
    it("should return restaurants filtered by cuisine", async () => {
      const req = { query: { cuisine: "italian", page: 1, limit: 10 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await restaurantController.filterRestaurant(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
});
