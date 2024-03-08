import { restaurantUrl } from "./utils";
const fetchResturants = async () => {
  try {
    const response = await fetch(restaurantUrl());
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("error get restaurant", error.message);
    throw error;
  }
};
export default fetchResturants;
