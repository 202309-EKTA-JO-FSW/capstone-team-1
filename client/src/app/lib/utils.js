const main_url = "http://localhost:3001/api";

const restaurantUrl = () => {
  return main_url + "/restuarnt";
};

export const signupUrl = main_url + "/auth/signup";
export const loginUrl = main_url + "/auth/login";
