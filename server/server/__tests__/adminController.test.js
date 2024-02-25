const { createToken } = require("../controllers/authController");
const app = require("../utils/server");
const request = require("supertest")(app);
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const authUser = require("../middleware/authUser");
require("dotenv").config();
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");

const menuItemObj = {
  name: "Burger",
  description: "It's a good burger belive me",
  price: 5,
  type: "fast food",
};

const userObj = {
  _id: mongoose.Types.ObjectId("65db72803901db3d0cfba489"),
  first_name: "George",
  last_name: "Odisho",
  email: "george@gmail.com",
  password: "password",
  age: 23,
  gender: "male",
  phone_number: "phoneNumber",
  avatar: "image",
  isAdmin: true,
  restaurant: mongoose.Types.ObjectId("65db743623c73527257f6a1b"),
};

const restaurantObj = {
  _id: mongoose.Types.ObjectId("65db743623c73527257f6a1b"),
  name: "Mr.Burger",
  description: "best burgers",
  cuisine: "American",
  profile_image: "image",
  owner: mongoose.Types.ObjectId("65db72803901db3d0cfba489"),
};

beforeAll(async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    // Create the user object
    await User.create(userObj);
    // Create the restaurant object
    await Restaurant.create(restaurantObj);
  } catch (error) {
    console.error("Error creating user:", error);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Admin restaurant endpoints", () => {
  let authToken;

  beforeAll(async () => {
    // Authenticate the user and obtain the authentication token
    const user = await User.findById(userObj._id);
    authToken = createToken(user._id);
  });

  describe("POST /admin/restaurant/menuItem/new", () => {
    test("Should return 201 when create a new menuItem successful", async () => {
      const responde = await request
        .post("/api/admin/restaurant/menuItem/new")
        .set("authorization", `Bearer ${authToken}`)
        .send(menuItemObj);

      expect(responde.status).toBe(201);
    });

    test("Should return 401 and message Please login if the admin try create a new menuItem without loged in", async () => {
      const responde = await request
        .post("/api/admin/restaurant/menuItem/new")
        .send(menuItemObj);

      expect(responde.body.message).toBe("Please login");
      expect(responde.status).toBe(401);
    });
    test("Should return 401 and message Please login if the admin try create a new menuItem without loged in", async () => {
      const responde = await request
        .post("/api/admin/restaurant/menuItem/new")
        .send(menuItemObj);

      expect(responde.body.message).toBe("Please login");
      expect(responde.status).toBe(401);
    });
  });
});
