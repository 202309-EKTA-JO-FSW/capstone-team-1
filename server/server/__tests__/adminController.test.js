const app = require("../index");
const request = require("supertest")(app);
const db = require("../db/connection");
const mongoose = require("mongoose");
const { createToken } = require("../controllers/authController");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const MenuItem = require("../models/menuItemModel");
const {
  adminMock,
  customerMock,
  restaurantMock,
  menuItemMock,
} = require("./data");

beforeAll(async () => {
  db.connectToMongo();
});

afterAll(async () => {
  await db.closeDatabase();
});

beforeEach(async () => {
  // Clear the database and reseed data before each test
  await db.clearDatabase();
  await seedData();
});

async function seedData() {
  // Seed necessary data before tests
  await User.create(adminMock);
  await User.create(customerMock);
  await Restaurant.create(restaurantMock);
}

describe("Admin restaurant endpoints", () => {
  let adminToken;
  let customerToken;
  beforeEach(async () => {
    // Authenticate the user and obtain the authentication token
    const admin = await User.findById(adminMock._id);
    adminToken = createToken(admin._id);

    const customer = await User.findById(customerMock._id);
    customerToken = createToken(customer._id);
  });

  //create restaurant
  describe("POST /admin/restaurant/new", () => {
    test("should return 201 when a new restaurant is created successfully", async () => {
      const response = await request
        .post("/api/admin/restaurant/new")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(restaurantMock);

      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty(
        "message",
        "Create new restaurant successful"
      );
    });

    test("should return 401 Unauthorized if user is not authenticated", async () => {
      const response = await request
        .post("/api/admin/restaurant/new")
        .set("authorization", `Bearer ${adminToken + 1}`)
        .send(restaurantMock);

      expect(response.status).toBe(401);
    });
    test("should return 400 if required fields are missing", async () => {
      const response = await request
        .post("/api/admin/restaurant/new")
        .set("authorization", `Bearer ${adminToken}`)
        .send({
          _id: mongoose.Types.ObjectId("65db743623c73527257f6a1b"),
          name: "Restaurant Name",
          description: "Restaurant Description",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Missing required fields");
    });
  });
  //update restaurant
  describe("PUT /admin/restaurant", () => {
    test("should return 200 when restaurant is updated successfully", async () => {
      const response = await request
        .put("/api/admin/restaurant")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ name: "Updated Restaurant" });

      expect(response.status).toBe(200);

      expect(response.body.message).toBe("Update restaurant successful");
    });
  });
  //get restaurant
  describe("GET /admin/restaurant", () => {
    test("should return 200 when restaurant found for the admin", async () => {
      const response = await request
        .put("/api/admin/restaurant")
        .set("Authorization", `Bearer ${adminToken}`)
        .send();

      expect(response.status).toBe(200);
    });

    test("should return 401 Unauthorized if user is not authenticated", async () => {
      const response = await request
        .post("/api/admin/restaurant")
        .set("authorization", `Bearer ${adminToken + 1}`)
        .send();

      expect(response.status).toBe(401);
    });
  });

  // create menuItem
  describe("POST /admin/restaurant/menuItem/new create menu Item", () => {
    test("Should return 201 when create a new menuItem", async () => {
      const respond = await request
        .post("/api/admin/restaurant/menuItem/new")
        .set("authorization", `Bearer ${adminToken}`)
        .send(menuItemMock);

      expect(respond.status).toBe(201);
    });

    test("Should return 401 and message Please login if the admin try create a new menuItem without loged in or the token was expired", async () => {
      const respond = await request
        .post("/api/admin/restaurant/menuItem/new")
        .set("authorization", `Bearer ${adminToken + 1}`)
        .send(menuItemMock);

      expect(respond.body.message).toBe("Please login");
      expect(respond.status).toBe(401);
    });

    test("Should return 403 access denied when the user is customer", async () => {
      const respond = await request
        .post("/api/admin/restaurant/menuItem/new")
        .set("authorization", `Bearer ${customerToken}`)
        .send(menuItemMock);

      expect(respond.status).toBe(403);
    });
  });

  // update menuItem
  describe("PUT /admin/restaurant/menuItem/:itemId update menu Item", () => {
    // creat a meanu Item
    let newMenuItem;
    beforeEach(async () => {
      newMenuItem = await MenuItem.create({
        ...menuItemMock,
        restaurant: restaurantMock._id,
      });
    });

    test("Should return 200 when menuItem updated successfully", async () => {
      const respond = await request
        .put(`/api/admin/restaurant/menuItem/${newMenuItem._id}`)
        .set("authorization", `Bearer ${adminToken}`)
        .send({ name: "Mickel" });

      expect(respond.status).toBe(200);
      expect(respond.body.message).toBe("Update menuItem successful");
    });

    test("Should return 403 when customer try to updated menuItem", async () => {
      const respond = await request
        .put(`/api/admin/restaurant/menuItem/${newMenuItem._id}`)
        .set("authorization", `Bearer ${customerToken}`)
        .send({ name: "Mickel" });
      expect(respond.status).toBe(403);
    });
    test("Should return 404 No Found when restaurant doesn't have the menuItem ", async () => {
      newMenuItem = await MenuItem.create({
        ...menuItemMock,
        _id: mongoose.Types.ObjectId(),
        image: "image",
        restaurant: mongoose.Types.ObjectId(),
      });
      const respond = await request
        .put(`/api/admin/restaurant/menuItem/${newMenuItem._id}`)
        .set("authorization", `Bearer ${adminToken}`)
        .send({ name: "Mickel" });

      expect(respond.status).toBe(404);
    });
  });

  // delete meanuItem
  describe("DELETE /admin/restaurant/menuItem/:itemId delete menu Item", () => {
    let newMenuItem;
    beforeEach(async () => {
      newMenuItem = await MenuItem.create({
        ...menuItemMock,
        restaurant: restaurantMock._id,
      });
    });
    test("Should return 200 & Delete menuItem successful when menuItem deleted successfully", async () => {
      const respond = await request
        .delete(`/api/admin/restaurant/menuItem/${menuItemMock._id}`)
        .set("authorization", `Bearer ${adminToken}`);

      expect(respond.status).toBe(200);
      expect(respond.body.message).toBe("Delete menuItem successful");
    });

    test("Should return 403 when customer try to cancel the menuItem", async () => {
      const respond = await request
        .delete(`/api/admin/restaurant/menuItem/${menuItemMock._id}`)
        .set("authorization", `Bearer ${customerToken}`);

      expect(respond.status).toBe(403);
    });

    test("Should return 404 No Found when restaurant doesn't have the menuItem", async () => {
      const respond = await request
        .delete(`/api/admin/restaurant/menuItem/${mongoose.Types.ObjectId()}`)
        .set("authorization", `Bearer ${adminToken}`);

      expect(respond.status).toBe(404);
    });
  });
});
