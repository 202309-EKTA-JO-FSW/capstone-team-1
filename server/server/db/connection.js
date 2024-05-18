const mongoose = require("mongoose");
require("dotenv").config().parsed;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, TEST_DB_HOST } =
  process.env;

const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${
  process.env.NODE_ENV === "test" ? TEST_DB_HOST : DB_HOST
}:${DB_PORT}/${DB_NAME}?authSource=admin`;

// const url = DB_URI;
const url = process.env.DB_URL;

const connectToMongo = () => {
  mongoose.connect(url, { useNewUrlParser: true, dbName: "restaurant" });

  db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

const closeDatabase = async (drop = false) => {
  if (!DB_HOST) return;
  drop && (await mongoose.connection.dropDatabase());
  await mongoose.disconnect();
  await mongoose.connection.close();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

module.exports = { connectToMongo, closeDatabase, clearDatabase };
