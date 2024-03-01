const MenuItem = require("../models/menuItemModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");

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

//Checkout function

//Post Checkout - create new order

const newOrder = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const restaurant = await Restaurant.findById(req.resId);

    // check if there is a cart
    if (!user.cart) return res.status(422).json({ message: "Empty Cart" });
    const newOrder = await Order.create({
      customer: req.userId,
      restaurant: user.cart.restaurant,
      cartItems: user.cart,
      deliveryFees: 2.5,
      subtotal: user.cart.menuItems.total,
      total: deliveryFees + subtotal,
    });

    res.status(201).json({ message: "Ready for Checkout", newOrder });

    //add order to the restaurant
    restaurant.orders.push(newOrder);
    await restaurant.save();

    //add order to the customer
    user.orders.push(newOrder);
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//update checkout/order

const updateOrder = async (req, res) => {
  try {
    //check checkout/order id
    const order = await Order.findById(req.orderId);

    // check if the order is available
    if (!order) return res.status(404).json({ message: "Order not found" });

    // customer can only add note before  delivery
    if (req.body.note && order.status !== "delivered") {
      order.note = req.body.note;
    } else {
      res
        .status(400)
        .json({ message: "Cannot add notes to order after it's delivered" });
    }
    //customer can only add review after delivery
    if (req.body.review && order.status === "delivered") {
      order.review = req.body.review;
      //add review to the restaurant
      const restaurant = await Restaurant.findById(req.resId); // do we use restaurant model or the order model to get the resId?
      restaurant.reviews.push(order.review); // not sure if we push order.review or the orderId
      await restaurant.save();
    } else {
      res
        .status(400)
        .json({ message: "Cannot review order before it's delivered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//cancel checkout - delete order
const cancelOrder = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const order = await Order.findById(req.orderId);
    const restaurant = await Restaurant.findById(order.restaurant._id);

    // check if there is a user
    if (!user) return res.status(403).json({ message: "Access denied" });

    // check if the order exists
    if (!order) res.status(400).json({ message: "No order found" });

    // if found, delete the order and remove it from restaurant and user models
    const deletedOrder = await Order.deleteOne(req.orderId);

    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  newCart,
  updateCart,
  cancelCart,
  newOrder,
  updateOrder,
  cancelOrder,
};
