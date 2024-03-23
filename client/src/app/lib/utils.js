const main_url = "https://capstone-team-1.onrender.com/api";
// const main_url = "http://localhost:3001/api";
// http://localhost:3001
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

//admin url
export const adminNewRestaurantUrl = main_url + `/admin/restaurant/new`;
export const adminGetRestaurantUrl = main_url + `/admin/restaurant`;
export const adminUpdateRestaurantUrl = main_url + `/admin/restaurant`;

//menuItems url

// menu items
export const menuItemsUrl = (resId) =>
  main_url + `/restaurant/${resId}/menuItems`;

export const newMenuItemUrl = main_url + "/admin/restaurant/menuItem/new";
export const updateMenuItemUrl = main_url + "/admin/restaurant/menuItem";

// cart
export const cartUrl = main_url + "/customer/cart";
export const updateCartUrl = (resId) => main_url + `/customer/cart/${resId}`;

// checkout
export const checkoutUrl = main_url + "/customer/checkout";

// user orders
export const userOrdersUrl = main_url + "/customer/orders";
export const singleUserOrderUrl = (orderId) =>
  main_url + `/customer/order/${orderId}`;

// restaurant orders
export const restaurantOrdersUrl = main_url + "/admin/restaurant/orders";
export const singleRestaurantOrderUrl = (orderId) =>
  main_url + `/admin/restaurant/order/${orderId}`;

// single restaurant url
export const singleRestaurantUrl = (resId) => main_url + `/restaurant/${resId}`;
