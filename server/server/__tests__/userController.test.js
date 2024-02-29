const app = require("../index");
const request = require("supertest")(app);
const db = require("../db/connection");
const mongoose = require("mongoose");
const { createToken } = require("../controllers/authController");
const User = require("../models/userModel");
const { adminMock } = require("./data");

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
}
describe("User profile endpoints", () => {
  let userToken;
  beforeEach(async () => {
    // Authenticate the user and obtain the authentication token
    const user = await User.findById(adminMock._id);
    userToken = createToken(user._id);
  });
  describe("GET /user/profile", () => {
    test("should return 200 when user found", async () => {
      const response = await request
        .put("/api/user/profile")
        .set("Authorization", `Bearer ${userToken}`)
        .send();

      expect(response.status).toBe(200);
    });

    test("should return 401  if user is not authenticated  or the token was expired", async () => {
      const response = await request
        .post("/api/user/profile")
        .set("authorization", `Bearer ${userToken + 1}`)
        .send();

      expect(response.status).toBe(401);
    });
  });
  describe("PUT /user/profile", () => {
    test("should return 200 when user is updated successfully", async () => {
      const response = await request
        .put("/api/user/profile")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ name: "Updated User" });

      expect(response.status).toBe(200);

      expect(response.body.message).toBe("Update user successful");
    });
  });
});
