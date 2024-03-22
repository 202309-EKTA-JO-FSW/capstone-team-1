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

    // add subtotal
    user.cart.subtotal = user.cart.menuItems.reduce(
      (total, item) => total + item.total,
      0
    );

    // add menuitems count
    const menuItemCount = user.cart.menuItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    user.cart.itemsCount = menuItemCount;

    await user.save();

    return res
      .status(201)
      .json({ message: "Menu item added to cart", results: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: "cart.restaurant",
        model: "Restaurant",
      })
      .populate({
        path: "cart.menuItems.menuItem",
        model: "MenuItem",
      });

    if (!user)
      return res.status(401).json({ message: "User not found, Please login" });

    // if (!user.cart) return res.status(404).json({ message: "Cart is empty" });
    let cart;
    if (user.cart) {
      cart = {
        restaurant: user.cart.restaurant.name,
        menuItems: user.cart.menuItems,
        itemsCount: user.cart.itemsCount,
        subtotal: user.cart.subtotal,
      };
    } else {
      cart = [];
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
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

    user.cart.subtotal = user.cart.menuItems.reduce(
      (total, item) => total + item.total,
      0
    );

    // add menuitems count
    user.cart.itemsCount = user.cart.menuItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (user.cart.subtotal === 0) {
      user.cart = null;
    }

    await user.save();

    return res.status(200).json({
      message: "cart updated successfully",
      results: user,
    });
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
      res.status(404).json({ message: "Could not find any cart" });

    // if so, make it null as delete the cart
    user.cart = null;

    await user.save();

    return res.status(200).json({ message: "Cart deleted", results: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

//Checkout function
//Post Checkout - create new order
const checkout = async (req, res) => {
  const userId = req.userId;

  try {
    // Find the user by ID and populate the cart field
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    const { cart } = user;

    //Calculate subtotal, delivery fees, and total based on cart items
    const deliveryFee = 2.5;
    // Calculate total including delivery fees
    const total = cart.subtotal + deliveryFee;
    const newOrder = {
      customer: userId,
      restaurant: cart.restaurant,
      cartItems: cart.menuItems,
      deliveryFees: deliveryFee,
      itemsCount: cart.itemsCount,
      subtotal: cart.subtotal,
      total: total,
    };

    const order = await Order.create(newOrder);

    user.orders.push(order._id);

    user.cart = null;

    await user.save();

    return res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// process checkout/order
const placeOrder = async (req, res) => {
  const { orderId } = req.params;
  const { note } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Access denied" });
    //check checkout/order id
    const order = await Order.findOne({ customer: user._id, _id: orderId });

    // check if the order is available
    if (!order) return res.status(404).json({ message: "Order not found" });

    // customer can only add note before precess the order
    if (note) {
      order.note = note;
    } else if (note && order.status === "accepted") {
      return res
        .status(400)
        .json({ message: "Cannot add notes to order after it's accepted" });
    }

    // make the order accepted
    order.status = "accepted";

    await order.save();

    // add order to the restaurant
    const restaurantId = order.restaurant;
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.orders.push(order._id);
    await restaurant.save();

    return res.status(201).json({ message: "Order proceed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

//cancel checkout - delete order
const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Access denied" });
    const order = await Order.findOne({ _id: orderId, customer: user._id });

    if (!order) return res.status(404).json({ message: "Order not found" });
    // if order already was proceeded, just change the status to cancel
    if (order.status) {
      order.status = "canceled";
      await order.save();
      return res.status(200).json({ message: "Order canceled", order });
    }

    // if found, delete the order and remove it from restaurant and user models
    const deletedOrder = await Order.deleteOne({
      _id: orderId,
      customer: user._id,
    });

    // Remove the order from the user's orders list
    const orderIndexUser = user.orders.findIndex((delOrder) =>
      delOrder.equals(orderId)
    );
    user.orders.splice(orderIndexUser, 1);
    await user.save();

    return res.status(200).json({ message: "Order canceled", deletedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Orders
const getOrders = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Access denied" });

    // find orders
    const orders = await Order.find({ customer: user._id })
      .populate("customer")
      .populate("restaurant")
      .populate("cartItems.menuItem")
      .sort({ createdAt: -1 });

    if (!orders) return res.status(404).json({ message: "No orders found" });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// get single order
// get checkout
const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    // find user
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Access denied" });

    // find orders
    const order = await Order.findOne({ customer: user._id, _id: orderId })
      .populate("customer")
      .populate("restaurant")
      .populate("cartItems.menuItem");

    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  newCart,
  updateCart,
  cancelCart,
  checkout,
  placeOrder,
  cancelOrder,
  getSingleOrder,
  getCart,
  getOrders,
};
