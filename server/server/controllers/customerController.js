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

    const cart = {
      restaurant: user.cart.restaurant.name,
      menuItems: user.cart.menuItems,
    };
    return returnres.status(200).json(cart);
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
      res.status(404).json({ message: "Could not find any cart" });

    // if so, make it null as delete the cart
    user.cart = null;

    await user.save();

    return res
      .status(200)
      .json({ message: "Cart deleted successfully", results: user });
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
    const userCart = await User.findById(userId);
    if (!userCart) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    const { cart } = userCart;
    //Calculate subtotal, delivery fees, and total based on cart items
    let subtotal = 0;
    cart.menuItems.forEach((item) => {
      subtotal += item.quantity * item.total;
    });
    const deliveryFee = 2.5;
    // Calculate total including delivery fees
    const total = subtotal + deliveryFee;
    const newOrder = {
      customer: userId,
      restaurant: cart.restaurant,
      cartItems: cart.menuItems,
      deliveryFees: deliveryFee,
      subtotal: subtotal,
      total: total,
    };

    const order = await Order.create(newOrder);

    return res.status(201).json({ message: "Ready for Checkout", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// process checkout/order
const processCheckout = async (req, res) => {
  const { checkoutId } = req.params;
  const { note } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Access denied" });
    //check checkout/order id
    const order = await Order.findById(checkoutId);
    // check if the order is available
    if (!order) return res.status(404).json({ message: "Order not found" });

    // customer can only add note before precess the order
    if (note) {
      order.note = req.body.note;
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

    // add order to the customer model
    user.orders.push(order._id);
    await user.save();

    //customer can only add review after delivery
    // if (req.body.review && order.status === "delivered") {
    //   order.review = req.body.review;
    // } else if (req.body.review && order.status !== "delivered") {
    //   return res
    //     .status(400)
    //     .json({ message: "Cannot add reviews until the order is delivered" });
    // }
    // // Save the updated order
    // await order.save();

    //add review to the restaurant
    // const restaurant = await Restaurant.findById(order.restaurant);
    // if (!restaurant)
    //   return res.status(404).json({ message: "Restaurant not found" });

    // restaurant.reviews.push({
    //   customer: req.userId,
    //   rating: req.body.review.rating,
    //   comment: req.body.review.comment,
    // });
    // await restaurant.save();
    return res.status(201).json({ message: "Order is proceeded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

//cancel checkout - delete order
const cancelCheckout = async (req, res) => {
  const { checkoutId } = req.params;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Access denied" });
    const order = await Order.findById(checkoutId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // if found, delete the order and remove it from restaurant and user models
    const deletedOrder = await Order.deleteOne({ _id: checkoutId });

    // Remove the order from the user's orders list
    const orderIndexUser = user.orders.findIndex((delOrder) =>
      delOrder.equals(order._id)
    );
    user.orders.splice(orderIndexUser, 1);
    await user.save();

    // Remove the order from the restaurant's orders list
    const restaurant = await Restaurant.findById(order.restaurant);
    const orderIndexRes = restaurant.orders.findIndex((delOrder) =>
      delOrder.equals(order._id)
    );
    restaurant.orders.splice(orderIndexRes, 1);
    await restaurant.save();

    return res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// get checkout
const getCheckout = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Access denied" });

    // find orders
    const order = await Order.find({ customer: user._id });
    if (!order) return res.status(404).json({ message: "No orders has made" });

    // check if the order is delivered
    if (order.status === deliveried) {
      return res
        .status(400)
        .json({ message: "The order is already delivered" });
    }

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
  processCheckout,
  cancelCheckout,
  getCheckout,
  getCart,
};
