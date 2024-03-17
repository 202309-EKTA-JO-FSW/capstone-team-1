const main_url = "http://localhost:3001/api";

// auth url
export const signupUrl = main_url + "/auth/signup";
export const loginUrl = main_url + "/auth/login";
export const logoutUrl = main_url + "/auth/logout";
export const googleLoginUrl = main_url + "/auth/google";
export const getGoogleUser = main_url + "/auth/me";

// user
export const userProfileUrl = main_url + "/user/profile";

// restaurant url
export const restaurantUrl = main_url + `/restaurant`;

// menu items
export const menuItemsUrl = (resId) =>
  main_url + `/restaurant/${resId}/menuItems`;

// cart
export const cartUrl = main_url + "/customer/cart";
export const updateCartUrl = (resId) => main_url + `/customer/cart/${resId}`;

// checkout
export const checkoutUrl = main_url + "/customer/checkout";
