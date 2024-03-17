const {
  signupUrl,
  loginUrl,
  getGoogleUser,
  userProfileUrl,
  restaurantUrl,
  menuItemsUrl,
  newMenuItemUrl,
  menuItemsUrl,
  cartUrl,
  updateCartUrl,
} = require("./utils");

// signup
export const fetchSignup = async (form) => {
  try {
    const res = await fetch(signupnewUrl, {
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

// fetch menuItems

export const fetchMenuItems = async (resId) => {
  try {
    const url = `${restaurantUrl}/${resId}/menuItems`;

    const res = await fetch(url);
    const menuItems = await res.json();
    return menuItems;
  } catch (error) {
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
