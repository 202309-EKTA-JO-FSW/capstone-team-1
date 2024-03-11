main_url = `http://localhost:3001/api`;

const restaurantUrl = () => {
  return main_url + "/restuarnt";
};

const menuItemsUrl = (resId) => {
  return main_url + `/${resId}/menuItems`;
};
