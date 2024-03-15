"use client"
import { useEffect, useState } from 'react';
import MenuItemCard from './MenuItemCard';
import { fetchMenuItem } from "@/app/lib/data";

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

  const defaultMenuItems = [
    { id: 1, name: 'Burger', price: 10 },
    { id: 2, name: 'Pizza', price: 12 },
    { id: 3, name: 'Salad', price: 8 }, 
    { id:3, name: 'Pasta', price: 13 }
  ];

  const renderMenuItems = (items) => (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <MenuItemCard key={item.id} menuItem={item} />
        ))}
      </div>
    </div>
  );

  if (menuItems.message) {
    return (
      <div className="flex justify-center items-center h-screen">
        {renderMenuItems(defaultMenuItems)}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {menuItems.length > 0 ? (
        renderMenuItems(menuItems)
      ) : (
        <p>{menuItems.message}</p>
      )}
    </div>
  );
};

export default RestaurantMenu;