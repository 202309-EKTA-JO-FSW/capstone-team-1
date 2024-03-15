import { menuItemsUrl } from './utils';

const fetchRestaurants = async () => {
  try {
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

const fetchMenuItem = async (resId) => {
  try { 
    const res = await fetch(menuItemsUrl(resId));
    return await res.json();
  } catch (error) {
    console.error('Error fetching menu item:', error);
    throw error; 
  }
};

export { fetchRestaurants, fetchMenuItem };
