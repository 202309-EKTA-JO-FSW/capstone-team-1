import { restaurantUrl } from "./utils";
export const fetchRestaurants = async () => {
  try {
    const response = await fetch(restaurantUrl);
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error getting restaurants:", error.message);
    throw error;
  }
};

export const searchRestaurant = async (search, page, limit) => {
  try {
    console.log(search);
    const url = `${restaurantUrl}?search=${search}&page=${page}&limit=${limit}`;
    console.log(url);
    const response = await fetch(url);
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error searching restaurants:", error.message);
    throw error;
  }
};
