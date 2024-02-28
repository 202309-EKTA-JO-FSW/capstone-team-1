const app = require("../index");
const request = require("supertest")(app);
const db = require("../db/connection");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const MenuItem = require("../models/menuItemModel");
const {
  adminMock,
  customerMock,
  restaurantMock,
  menuItemMock,
  restaurantMock1,
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
  await Restaurant.create(restaurantMock1)
}

// Get all menuitems for one restaurant
describe("GET /restaurant/menuItems", () => {
  let newMenuItem;
  beforeEach(async () => {
    newMenuItem = await MenuItem.create({
      ...menuItemMock,
      restaurant: restaurantMock._id,
    });
    
  });
  test("Should return 200 when menuitems are fetched", async () => {
    const response = await request
      .get(`/api/restaurant/${restaurantMock._id}/menuItems`)
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });


  test("Should return 422 and message Restaurant doesn't have any Items", async () => {
    const response = await request.get(
      `/api/restaurant/${restaurantMock1._id}/menuItems`
    );
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Restaurant doesn't have any MenuItems");
  });
});


//get one menuItem from restaurant
describe("GET /:resId/menuItems/:itemId", () => {
  let newMenuItem;
  beforeEach(async () => {
    newMenuItem = await MenuItem.create({
      ...menuItemMock,
      restaurant: restaurantMock._id,
    });
  });
  test("Should return 200 when one menuItem is fetched", async () => {
    const response = await request.get(
      `/api/restaurant/${restaurantMock._id}/menuItems/${newMenuItem._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
  });

  test("Should return 404 and message Menu Item not found", async () => {
    const response = await request.get(
      `/api/restaurant/${restaurantMock._id}/menuItems/65db72803901db3d0cfba110`
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Menu item not found");
  });
});

// filter menuItems
describe("GET :resId/menuItems/filter", () => {
  test("Should return 200 when filter is applied on Menu items", async () => {
    const response = await request.get(
      `/api/restaurant/${restaurantMock._id}/menuItems/filter?type=${menuItemMock.type}`
    );
    expect(response.status).toBe(200);
    //expect(response.body.menuItemMock.length).toBe(1);
  });

  
});
//search MenuItems
describe("GET /:resId/menuItems/search", () => {
  let newMenuItem;
  beforeEach(async () => {
    newMenuItem = await MenuItem.create({
      ...menuItemMock,
      restaurant: restaurantMock._id,
    });
  });
  test("Should return 200 when search for MenuItem is found", async () => {
    const response = await request.get(
      `/api/restaurant/${restaurantMock._id}/menuItems/search?type=${menuItemMock.type}`
    );
    expect(response.status).toBe(200);
    //expect(response.body.menuItemMock.length).toBe(1);
  });
});
