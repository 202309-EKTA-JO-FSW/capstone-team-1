const User = require("../models/userModel");
const MenuItem = require("../models/menuItemModel");
const Restaurant = require("../models/restaurantModel");
const { uploadImage, deleteImage } = require("../utils/images/imageStorage");
const { validateRestaurant } = require("../utils/validation");

// add a new menuItem
const addNewItem = async (req, res) => {
  const { name, description, price, type } = req.body;
  try {
    // valdite menuItem fields
    if (!name || !description || !price || !type) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const user = await User.findById(req.userId);
    // checking if the user is admin
    if (!user || !user.isAdmin) {
      return res
        .status(403) // because user is unauthorized
        .json({
          message:
            "Access Denied: Only owner of restaurant is allowed to add menu items",
        });
    }

    const restaurant = await Restaurant.findById(user.restaurant);

    // check if there user has a restaurant
    if (!restaurant)
      return res.status(404).json({
        message:
          "Cannot add menu item: Please create a restaurant profile first",
      });

    // get image url
    // uploadImage arguments uploadImage(imagefile, imageFolder in firebase storage)
    let imageUrl;
    if (req.file) {
      imageUrl = await uploadImage(req.file, "menuItemImages");
      if (!imageUrl) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }
    // create a new menuItem
    const newMenuItem = await MenuItem.create({
      name,
      description,
      image,
      price,
      type,
      image: imageUrl,
      restaurant: user.restaurant._id,
    });

    // add the menuItem to resturant menu
    restaurant.menuItems.push(newMenuItem._id);
    await restaurant.save();

    return res.status(201).json({
      message: "Create new menuItem successful",
      results: newMenuItem,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update menuItem
const updateItem = async (req, res) => {
  const { name, description, price, available, type } = req.body;
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.userId);
    // checking if the user is admin
    if (!user || !user.isAdmin) {
      return res
        .status(403) // because user is unauthorized
        .json({
          message:
            "Access Denied: Only owner of restaurant are allowed to update menu items",
        });
    }

    const restaurant = await Restaurant.findById(user.restaurant);

    // check if there user has a restaurant
    if (!restaurant)
      return res.status(404).json({
        message:
          "Cannot update menu item: Please create a restaurant profile first.",
      });

    // check if the menuItem exist
    if (!restaurant.menuItems.includes(itemId))
      return res.status(404).json({
        message: "Menu item not found",
      });

    // menuItem model
    const menuItem = await MenuItem.findById(itemId);

    // get image url
    // uploadImage arguments uploadImage(imagefile, imageFolder in firebase storage)
    let imageUrl;
    if (req.file) {
      // delete the old image and then update the new one
      deleteImage(menuItem.image);
      imageUrl = await uploadImage(req.file, "menuItemImages");
      if (!imageUrl) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    // update menu item
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.image = imageUrl || menuItem.image;
    menuItem.price = price || menuItem.price;
    menuItem.available = available || menuItem.available;
    menuItem.type = type || menuItem.type;

    await menuItem.save();

    return res.status(200).json({
      message: "Update menuItem successful",
      results: menuItem,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete menuItem
const deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.userId);
    // checking if the user is admin
    if (!user || !user.isAdmin) {
      return res
        .status(403) // because user is unauthorized
        .json({
          message:
            "Access Denied: Only owner of restaurant are allowed to delete menu items",
        });
    }

    const restaurant = await Restaurant.findById(user.restaurant);

    // check if there user has a restaurant
    if (!restaurant)
      return res.status(404).json({
        message:
          "Cannot delete menu item: Please create a restaurant profile first.",
      });

    // check if the menuItem exist
    if (!restaurant.menuItems.includes(itemId))
      return res.status(404).json({
        message: "Menu item not found",
      });

    // menuItem model
    const menuItem = await MenuItem.findById(itemId);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    if (menuItem.image) {
      // delete image from firebase storage
      deleteImage(menuItem.image);
    }

    // delete item by id
    const deletedMenuItem = await MenuItem.findByIdAndDelete(itemId);

    // Remove the deleted menuItem from the restaurant's menuItems
    restaurant.menuItems.pull(itemId);
    await restaurant.save();

    return res.status(200).json({
      message: "Delete menuItem successful",
      results: deletedMenuItem,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//create restaurant
const createRestaurant = async (req, res) => {
  const adminId = req.userId;
  const { name, description, cuisine, contact, image, address } = req.body;
  try {
    // validate restaurant feilds
    validateRestaurant(req.body);

    const user = await User.findById(adminId);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!name || !description || !cuisine) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newRestaurant = await Restaurant.create({
      name,
      description,
      cuisine,
      contact,
      image,
      address,
      owner: adminId,
    });
    user.restaurant = newRestaurant._id;
    await user.save();
    return res.status(201).json({
      restaurant: newRestaurant,
      message: "Create new restaurant successful",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get retaurant
const getAdminRestaurant = async (req, res) => {
  const adminId = req.userId;
  try {
    const user = await User.findById(adminId);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const restaurant = await Restaurant.findOne({ owner: adminId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json({ restaurant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update restaurant
const updateAdminRestaurant = async (req, res) => {
  const adminId = req.userId;
  try {
    const user = await User.findById(adminId);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const restaurantId = user.restaurant;
    if (!restaurantId) {
      return res
        .status(404)
        .json({ message: "Restaurant not found, should create a restaurant" });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({
      message: "Update restaurant successful",
      results: updatedRestaurant,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminRestaurant,
  updateAdminRestaurant,
  createRestaurant,
  addNewItem,
  updateItem,
  deleteItem,
};
