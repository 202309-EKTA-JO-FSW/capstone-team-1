const User = require("../models/userModel");
const MenuItem = require("../models/menuItemModel");
const Restaurant = require("../models/restaurantModel");
const { uploadImage } = require("../utils/images/uploadImage");

const addNewItem = async (req, res) => {
  const { name, description, image, price, type } = req.body;
  try {
    const user = await User.findById(req.userId);
    console.log(await uploadImage(req.file));
    // checking if the user is admin
    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ message: "You don't have access to add menu items" });
    }

    const restaurant = await Restaurant.findById(user.restaurant);

    // check if there user has a restaurant
    if (!restaurant)
      return res.json({ message: "Create resturant before add a menu item" });

    // get image url
    // uploadImage arguments uploadImage(imagefile, imageFolder in firebase storage)
    const imageUrl = await uploadImage(req.file, "menuItemImages");

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

module.exports = { addNewItem };
