"use client"
import { useEffect, useState } from 'react';
import MenuItemCard from './MenuItemCard';
import { fetchMenuItem } from "@/app/lib/data" ; 

const RestaurantMenu = ({ id }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchMenuItem(id);
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} menuItem={item} />
          ))}
        </div>
        {menuItems.length === 0 && <p>No menu items available.</p>}
      </div>
    </div>
  );
};

export default RestaurantMenu;

