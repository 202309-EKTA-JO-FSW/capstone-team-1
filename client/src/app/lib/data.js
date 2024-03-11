const fetchResturants = async () => {
  try {
  } catch (error) {}
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
