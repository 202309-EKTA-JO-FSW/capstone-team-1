const User = require("../models/userModel");
const MenuItem = require("../models/menuItemModel");
const Restaurant = require("../models/restaurantModel");
const { uploadImage, deleteImage } = require("../utils/images/imageStorage");

// add a new menuItem
const addNewItem = async (req, res) => {
  const { name, description, image, price, type } = req.body;
  try {
    const user = await User.findById(req.userId);
    // checking if the user is admin
    if (!user.isAdmin || user.isAdmin === null) {
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
    if (!user.isAdmin || user.isAdmin === null) {
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
    menuItem.type = type || menuItem;

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
    if (!user.isAdmin || user.isAdmin === null) {
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

    return res.status(200).json({
      message: "Delete menuItem successful",
      results: deletedMenuItem,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addNewItem, updateItem, deleteItem };
