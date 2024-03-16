const main_url = "http://localhost:3001/api";

// auth url
export const signupUrl = main_url + "/auth/signup";
export const loginUrl = main_url + "/auth/login";
export const googleLoginUrl = main_url + "/auth/google";
export const getGoogleUser = main_url + "/auth/me";
export const userProfileUrl = main_url + "/user/profile";

// restaurant url
export const restaurantUrl = main_url + `/restaurant`;

//menuItems url

export const menuItemsUrl = () => {
  
  main_url + `/restaurant/65f4f81a030431d98422a4c4/menuItems`;
};

export const newMenuItemUrl = main_url + "/admin/restaurant/menuItem/new";
