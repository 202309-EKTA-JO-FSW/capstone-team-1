const main_url = "http://localhost:3001/api";

// auth url
export const signupUrl = main_url + "/auth/signup";
export const loginUrl = main_url + "/auth/login";
export const googleLoginUrl = main_url + "/auth/google";
export const getGoogleUser = main_url + "/auth/me";
export const userProfileUrl = main_url + "/user/profile";

// restaurant url
export const restaurantUrl = main_url + `/restaurant`;

// menu items
export const menuItemsUrl = (resId) =>
  main_url + `/restaurant/${resId}/menuItems`;

// cart
export const cartUrl = main_url + "/customer/cart";
