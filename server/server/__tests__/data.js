const mongoose = require("mongoose");

const menuItemMock = {
  _id: mongoose.Types.ObjectId("65db72803901db3d0cfba111"),
  name: "Burger",
  description: "It's a good burger belive me",
  price: 5,
  type: "fast food",
  available: true,
};
const menuItemMock2 = {
  _id: mongoose.Types.ObjectId("65db72803901db3d0cfba122"),
  name: "Burger",
  description: "It's a good burger belive me",
  price: 5,
  type: "fast food",
  available: true,
  restaurant: mongoose.Types.ObjectId(),
};

const adminMock = {
  _id: mongoose.Types.ObjectId("65db72803901db3d0cfba489"),
  firstName: "George",
  last_name: "Odisho",
  email: "george@gmail.com",
  password: "password",
  phone_number: "phoneNumber",
  avatar: "image",
  isAdmin: true,
  restaurant: mongoose.Types.ObjectId("65db743623c73527257f6a1b"),
};

const customerMock = {
  _id: mongoose.Types.ObjectId("65db72803901db3d0cfba984"),
  firstName: "Gagi",
  lastName: "Odisho",
  email: "george2@gmail.com",
  password: "password",
  phone_number: "phoneNumber",
  avatar: "image",
  isAdmin: false,
  restaurant: mongoose.Types.ObjectId("65db743623c73527257f6a1b"),
};

const restaurantMock = {
  _id: mongoose.Types.ObjectId("65db743623c73527257f6a1b"),
  name: "Mr.Burger",
  description: "best burgers",
  cuisine: "American",
  image: "image",
  owner: mongoose.Types.ObjectId("65db72803901db3d0cfba489"),
  menuItems: [menuItemMock._id],
};

//mock restaurant without menuItems
const restaurantMock1 = {
  _id: mongoose.Types.ObjectId("65db743623c73527257f6a1c"),
  name: "Pizza Town",
  description: "Italian pizza",
  cuisine: "Italian",
  image: "image",
  owner: mongoose.Types.ObjectId("65db72803901db3d0cfba489"),
  menuItems: [],
};

module.exports = {
  adminMock,
  customerMock,
  menuItemMock,
  restaurantMock,
  menuItemMock2,
  restaurantMock1,
};
