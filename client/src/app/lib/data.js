const {
  signupUrl,
  loginUrl,
  getGoogleUser,
  userProfileUrl,
  restaurantUrl,
  adminNewRestaurantUrl,
  adminGetRestaurantUrl,
  adminUpdateRestaurantUrl,
  newMenuItemUrl,
  menuItemsUrl,
  cartUrl,
  updateCartUrl,
  updateMenuItemUrl,
  checkoutUrl,
  logoutUrl,
  userOrdersUrl,
  singleUserOrderUrl,
  restaurantOrdersUrl,
  singleRestaurantOrderUrl,
  singleRestaurantUrl,
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

// create restaurant
export const createRestaurant = async (formData) => {
  try {
    const res = await fetch(adminNewRestaurantUrl, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching menu item:", error);
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
    console.error("Error fetching menu item:", error);
    throw error;
  }
};

// post new MenuItem
export const postItem = async (formData) => {
  try {
    const res = await fetch(newMenuItemUrl, {
      method: "POST",

      body: formData,
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// update menu Items
export const fetchUpdateMenuItem = async (menuItemId, menuItem) => {
  const url = `${updateMenuItemUrl}/${menuItemId}`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuItem),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

//get admin restaurant
export const getAdminRestaurant = async () => {
  try {
    const res = await fetch(adminGetRestaurantUrl, { credentials: "include" });
    const restaurant = res.json();
    return restaurant;
  } catch (error) {
    console.error("Error getting restaurant", error.message);
    throw error;
  }
};

//update admin restaurant
export const updateAdminRestaurant = async (formData) => {
  try {
    const res = await fetch(adminUpdateRestaurantUrl, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// delete menuItem
export const fetchdeleteMenuItem = async (menuItemId) => {
  try {
    const res = await fetch(`${updateMenuItemUrl}/${menuItemId}`, {
      method: "delete",
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
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

//update user profile with avatar
export const fetchUserUpdateImg = async (formData) => {
  try {
    const res = await fetch(userProfileUrl, {
      method: "PUT",
      
      body: formData,
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

////////// restaurant orders ////////////

// fetch restaurant orders
// get users single order
export const fetchRestaurantOrders = async () => {
  try {
    const res = await fetch(restaurantOrdersUrl, {
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// get users single order
export const fetchSingleRestaurantOrder = async (orderId) => {
  try {
    const res = await fetch(singleRestaurantOrderUrl(orderId), {
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// get users single order
export const fetchUpdateRestaurantOrder = async (orderId, body) => {
  try {
    const res = await fetch(singleRestaurantOrderUrl(orderId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

////////////////////////////////////////

/////////////////restaurabnt nebu items ////////
// fetch single restaurant
export const fetchSingleRestaurant = async (resId) => {
  try {
    const res = await fetch(singleRestaurantUrl(resId));
    return await res.json();
  } catch (error) {
    console.error("Error fetching restaurant", error);
    throw error;
  }
};

// fetch menu items
export const fetchRestaurantMenuItems = async (resId) => {
  try {
    const res = await fetch(menuItemsUrl(resId));
    return await res.json();
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw error;
  }
};

// search menu item
export const fetchSearchMenuItem = async (resId, searchValue) => {
  try {
    const url = `${menuItemsUrl(resId)}/search?search=${searchValue}`;
    const response = await fetch(url);
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error searching menu items:", error.message);
    throw error;
  }
};
//////////////////////
