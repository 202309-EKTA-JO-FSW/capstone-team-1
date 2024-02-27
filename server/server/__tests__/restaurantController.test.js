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

// Get all menuitems for one restaurant
describe("GET /:resId/menuItems", () => {
  test("Should return 200 when menuitems are fetched", async () => {
    const respond = await request.get("/api/:resId/menuItem");
    expect(respond.status).toBe(200);
    expect(respond.body.menuItemMock.length).not.toBe(0);
  });

  test("Should return 422 and message Restaurant doesn't have any MenuItems", async () => {
    const respond = await request.get("/api/:resId/menuItem");

    expect(respond.status).toBe(422);
    expect(respond.body.message).toBe("Restaurant doesn't have any MenuItems");
  });

  test("Should return 500", async () => {
    const respond = await request.get("/api/:resId/menuItem");

    expect(respond.status).toBe(500);
    expect(respond.body.message).toBe(err.message);
  });
});
//get one menuItem from restaurant
describe("GET /:resId/menuItems/:itemId", () => {
  test("Should return 200 when one menuItem is fetched", async () => {
    const respond = await request.get(
      `/api/:resId/menuItem/${menuItemMock._id}`
    );
    expect(respond.status).toBe(200);
    expect(respond.body.menuItemMock.length).toBe(1);
  });

  test("Should return 404 and message Menu Item not found", async () => {
    const respond = await request.get(
      `/api/:resId/menuItem/${mongoose.Types.ObjectId()}`
    );

    expect(respond.status).toBe(404);
    expect(respond.body.message).toBe("Menu Item not found");
  });

  test("Should return 500", async () => {
    const respond = await request.get(
      `/api/:resId/menuItem/${menuItemMock._id}`
    );

    expect(respond.status).toBe(500);
    expect(respond.body.message).toBe(err.message);
  });
});

// filter menuItems
describe("GET :resId/menuItems/filter", () => {
  test("Should return 200 when filter is applied on Menu items", async () => {
    const respond = await request.get("/:resId/menuItems/filter");
    expect(respond.status).toBe(200);
    expect(respond.body.menuItemMock.length).toBe(1);
  });

  test("Should return 500", async () => {
    const respond = await request.get("/:resId/menuItems/filter");

    expect(respond.status).toBe(500);
    expect(respond.body.message).toBe(err.message);
  });
});
//search MenuItems
describe("GET /:resId/menuItems/search", () => {
  test("Should return 200 when search for MenuItem is found", async () => {
    const respond = await request.get("/:resId/menuItems/search");
    expect(respond.status).toBe(200);
    expect(respond.body.menuItemMock.length).toBe(1);
  });

  test("Should return 500", async () => {
    const respond = await request.get("/:resId/menuItems/search");

    expect(respond.status).toBe(500);
    expect(respond.body.message).toBe(err.message);
  });
});
