const app = require("../index");
const request = require("supertest")(app);
const db = require("../db/connection");
const mongoose = require("mongoose");
const { createToken } = require("../controllers/authController");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const MenuItem = require("../models/menuItemModel");
const {
  customerMock,
  restaurantMock,
  menuItemMock,
  menuItemMock2,
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
  await User.create(customerMock);
  await Restaurant.create(restaurantMock);
  await MenuItem.create({ ...menuItemMock, restaurant: restaurantMock._id });
}

describe("Admin cart endpoints", () => {
  let customerToken;

  beforeEach(async () => {
    // Authenticate the user and obtain the authentication token
    const customer = await User.findById(customerMock._id);
    customerToken = createToken(customer._id);
  });
  describe("POST /api/customer/cart create and add menuItem to the cart", () => {
    test("Should return 401 if user is not loged in", async () => {
      const response = await request
        .post("/api/customer/cart")
        .expect("Content-Type", /json/)
        .send({ menuItemId: menuItemMock._id });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Please login");
    });

    test("Should return 201 when create and add Item succfully", async () => {
      const response = await request
        .post("/api/customer/cart")
        .expect("Content-Type", /json/)
        .set("authorization", `Bearer ${customerToken}`)
        .send({ menuItemId: menuItemMock._id });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Menu item added to cart");
    });

    test("Should increase the quantity by 1 and increase total according to quantity when user add an item that already exist", async () => {
      // add the item to cart
      const user = await User.findById(customerMock._id);
      user.cart = {
        restaurant: restaurantMock._id,
        menuItems: [{ menuItem: menuItemMock._id, total: menuItemMock.price }],
      };
      await user.save();
      const response = await request
        .post("/api/customer/cart")
        .expect("Content-Type", /json/)
        .set("authorization", `Bearer ${customerToken}`)
        .send({ menuItemId: menuItemMock._id });

      const itemIndex = user.cart.menuItems.findIndex((item) =>
        item.menuItem.equals(menuItemMock._id)
      );

      const resUser = await User.findById(customerMock);

      expect(response.status).toBe(201);
      expect(resUser.cart.menuItems[itemIndex].quantity).toBe(2);
      expect(resUser.cart.menuItems[itemIndex].total).toBe(
        2 * menuItemMock.price
      );
    });

    test("Should return 404 If the Item not available or not found", async () => {
      // update the menuItem to be not available
      await MenuItem.findByIdAndUpdate(
        menuItemMock._id,
        { available: false },
        { new: true }
      );
      const response = await request
        .post("/api/customer/cart")
        .expect("Content-Type", /json/)
        .set("authorization", `Bearer ${customerToken}`)
        .send({ menuItemId: menuItemMock._id });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Menu item not avaialble");
    });

    test("Should return 403 when user try to add a menuItem from another restaurant", async () => {
      // create a diffrent menuItem to compare the restaurants
      const newMenuItem = await MenuItem.create(menuItemMock2);

      const user = await User.findById(customerMock._id);
      user.cart = {
        restaurant: restaurantMock._id,
        menuItems: [{ menuItem: menuItemMock._id, total: menuItemMock.price }],
      };
      await user.save();

      const response = await request
        .post("/api/customer/cart")
        .expect("Content-Type", /json/)
        .set("authorization", `Bearer ${customerToken}`)
        .send({ menuItemId: newMenuItem._id });

      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        "You can only order from one restaurant at a time"
      );
    });
  });

  // update cart
  describe("POST /api/customer/cart/:itemId add and remove the menuItem", () => {
    let user;
    beforeEach(async () => {
      // add a menuItem to cart for update
      user = await User.findById(customerMock._id);
      user.cart = {
        restaurant: restaurantMock._id,
        menuItems: [{ menuItem: menuItemMock._id, total: menuItemMock.price }],
      };
      await user.save();
    });

    test("Should return 200 and incease one item if status is add to same menuItem", async () => {
      const response = await request
        .put(`/api/customer/cart/${menuItemMock._id}`)
        .expect("Content-Type", /json/)
        .set("authorization", `Bearer ${customerToken}`)
        .send({ status: "add" });

      // grab the menuItem index from cart
      const itemIndex = user.cart.menuItems.findIndex((item) =>
        item.menuItem.equals(menuItemMock._id)
      );

      const resUser = await User.findById(customerMock);

      expect(response.status).toBe(200);
      expect(resUser.cart.menuItems[itemIndex].quantity).toBe(2);
      expect(resUser.cart.menuItems[itemIndex].total).toBe(
        2 * menuItemMock.price
      );
    });

    test("Should return 200 and decrease one item if status is remove to same menuItem", async () => {
      const response = await request
        .put(`/api/customer/cart/${menuItemMock._id}`)
        .expect("Content-Type", /json/)
        .set("authorization", `Bearer ${customerToken}`)
        .send({ status: "remove" });

      // grab the menuItem index from cart
      const itemIndex = user.cart.menuItems.findIndex((item) =>
        item.menuItem.equals(menuItemMock._id)
      );
      const resUser = await User.findById(customerMock);
      expect(response.status).toBe(200);
      expect(resUser.cart.menuItems[itemIndex]).toBe(undefined);
    });
  });

  // cancel cart
  describe("delete /api/customer/cart add and remove the menuItem", () => {
    let user;
    beforeEach(async () => {
      // create a cart to cancel it
      user = await User.findById(customerMock._id);
      user.cart = {
        restaurant: restaurantMock._id,
        menuItems: [{ menuItem: menuItemMock._id, total: menuItemMock.price }],
      };
      await user.save();
    });

    test("Should return 200 and delete the cart from user model", async () => {
      const response = await request
        .delete(`/api/customer/cart`)
        .expect("Content-Type", /json/)
        .set("authorization", `Bearer ${customerToken}`);

      const resUser = await User.findById(customerMock);

      expect(response.status).toBe(200);
      expect(resUser.cart).toBe(null);
    });
  });
});
