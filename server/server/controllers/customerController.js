const MenuItem = require("../models/menuItemModel");
const User = require("../models/userModel");

const newCart = async (req, res) => {
  const { menuItemId } = req.body;
  try {
    const user = await User.findById(req.userId);

    // check if there is a user
    if (!user) return res.status(403).json({ message: "Access denied" });

    // find the menuItemn
    const menuItem = await MenuItem.findById(menuItemId);

    // check if the menuItem is available
    if (!menuItem || !menuItem.available)
      return res.status(400).json({ message: "Menu item not avaialble" });

    // if there is no cart, we need just to creat a cart feild
    if (!user.cart) {
      user.cart = { restaurant: null, menuItems: [] };
    }

    // the user will be able only to order from one restaurant
    if (!user.cart.restaurant.equals(menuItem.restaurant)) {
      return res
        .status(403)
        .json({ message: "You can only order from one restaurant at a time" });
    }

    // add the restaurant
    user.cart.restaurant = menuItem.restaurant;

    const itemIndex = user.cart.menuItems.findIndex((item) =>
      item.menuItem.equals(menuItem._id)
    );
    // checking if the menu item is already to just increase the quentity
    // else if it is not, just push the menuItem to the array
    if (itemIndex !== -1) {
      user.cart.menuItems[itemIndex].quantity += 1;
      user.cart.menuItems[itemIndex].total =
        user.cart.menuItems[itemIndex].quantity * menuItem.price;
    } else {
      user.cart.menuItems.push({ menuItem: menuItemId, total: menuItem.price });
    }

    await user.save();

    res.status(201).json({ message: "Menu item added to cart", results: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { newCart };
