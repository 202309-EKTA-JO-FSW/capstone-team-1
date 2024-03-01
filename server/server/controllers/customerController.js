const MenuItem = require("../models/menuItemModel");
const User = require("../models/userModel");

// add menuItems to the cart
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
      return res.status(404).json({ message: "Menu item not avaialble" });

    // if there is no cart, we need just to creat a cart feild
    if (!user.cart) {
      user.cart = { restaurant: null, menuItems: [] };
    }

    // the user will be able only to order from one restaurant
    if (
      user.cart.restaurant !== null &&
      !user.cart.restaurant.equals(menuItem.restaurant)
    ) {
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

// add and remove menuItems from the cart
const updateCart = async (req, res) => {
  const { status } = req.body;
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.userId);

    // check if there is a user
    if (!user) return res.status(403).json({ message: "Access denied" });

    // find the menuItemn
    const menuItem = await MenuItem.findById(itemId);

    // check if the menuItem is available
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    const itemIndex = user.cart.menuItems.findIndex((item) =>
      item.menuItem.equals(menuItem._id)
    );

    if (status === "add") {
      user.cart.menuItems[itemIndex].quantity += 1;
      user.cart.menuItems[itemIndex].total =
        user.cart.menuItems[itemIndex].quantity * menuItem.price;
    } else if (status === "remove") {
      if (user.cart.menuItems[itemIndex].quantity === 1) {
        user.cart.menuItems.splice(itemIndex, 1);
      } else {
        user.cart.menuItems[itemIndex].quantity -= 1;
        user.cart.menuItems[itemIndex].total =
          user.cart.menuItems[itemIndex].quantity * menuItem.price;
      }
    } else {
      res
        .status(400)
        .json({ message: "Status should be either add or remove" });
    }

    await user.save();

    res
      .status(200)
      .json({ message: "cart updated successfully", results: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// cancel cart
const cancelCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // check if there is a user
    if (!user) return res.status(403).json({ message: "Access denied" });

    // check if the cart exist
    if (!user.cart)
      res.status(400).json({ message: "Could not find any cart" });

    // if so, make it null as delete the cart
    user.cart = null;

    await user.save();

    res
      .status(200)
      .json({ message: "Cart deleted successfully", results: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { newCart, updateCart, cancelCart };
