const {
  signupUrl,
  loginUrl,
  getGoogleUser,
  userProfileUrl,
  restaurantUrl,
  menuItemsUrl,
  cartUrl,
  updateCartUrl,
  checkoutUrl,
  logoutUrl,
  userOrdersUrl,
  singleUserOrderUrl,
} = require("./utils");

// signup
export const fetchSignup = async (form) => {
  try {
    const res = await fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// login
export const fetchLogin = async (form) => {
  try {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// login
export const fetchLogout = async () => {
  try {
    const res = await fetch(logoutUrl, { credentials: "include" });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// google auth
export const fetchGoogleUser = async () => {
  try {
    const res = await fetch(getGoogleUser, { credentials: "include" });
    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// fetch restaurant
export const fetchRestaurants = async (page, limit) => {
  try {
    const url = `${restaurantUrl}?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error getting restaurants:", error.message);
    throw error;
  }
};

// search restaurant
export const searchRestaurant = async (search, page, limit) => {
  try {
    const url = `${restaurantUrl}/search?search=${search}&page=${page}&limit=${limit}`;
    const response = await fetch(url);
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error searching restaurants:", error.message);
    throw error;
  }
};

// fetch menu items
export const fetchMenuItem = async (resId) => {
  try {
    const res = await fetch(menuItemsUrl(resId));
    return await res.json();
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw error;
  }
};

// post cart
export const fetchPostCart = async (menuItemId) => {
  try {
    const res = await fetch(cartUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menuItemId: menuItemId }),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// get cart info
export const fetchCart = async (menuItemId) => {
  try {
    const res = await fetch(cartUrl, {
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// USER
// update user profile
export const fetchUserUpdate = async (form) => {
  try {
    const res = await fetch(userProfileUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// get user profile
export const fetchUser = async () => {
  try {
    const res = await fetch(userProfileUrl, {
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// CART
// update cart info
export const fetchUpdateCart = async (itemId, statusRes) => {
  try {
    const res = await fetch(updateCartUrl(itemId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: statusRes }),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// cancel cart
export const fetchCancelCart = async () => {
  try {
    const res = await fetch(cartUrl, {
      method: "delete",
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// checkout
// create order
export const fetchCreateOrder = async () => {
  try {
    const res = await fetch(checkoutUrl, {
      method: "post",
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// get all users orders
export const fetchUserOrders = async () => {
  try {
    const res = await fetch(userOrdersUrl, {
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// get users single order
export const fetchSingleUserOrder = async (orderId) => {
  try {
    const res = await fetch(singleUserOrderUrl(orderId), {
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// get users single order
export const fetchPlaceOrder = async (orderId, noteValue) => {
  try {
    const res = await fetch(singleUserOrderUrl(orderId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: noteValue }),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// cancel order
export const fetchUserCancelOrder = async (orderId) => {
  try {
    const res = await fetch(singleUserOrderUrl(orderId), {
      method: "DELETE",
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};
