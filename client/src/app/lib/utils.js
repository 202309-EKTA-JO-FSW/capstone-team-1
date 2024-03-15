const main_url = `http://localhost:3001/api`;

export const restaurantUrl = () => {
  return main_url + "/restaurant";
};

export const menuItemsUrl = (resId) => {
  return main_url + `/restaurant/${resId}/menuItems`;
};
