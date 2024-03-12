import { restaurantUrl } from "./utils";
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
