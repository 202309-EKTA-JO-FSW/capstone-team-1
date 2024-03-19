"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { fetchMenuItem } from "@/app/lib/data";

const RestaurantMenu = ({ id }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const items = await fetchMenuItem(id);
        setMenuItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const renderMenuItems = (items) => (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item._id}>
            <MenuItemCard menuItem={item} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center">
      {menuItems.length > 0 ? (
        renderMenuItems(menuItems)
      ) : (
        <div className="h-[500px] flex items-center justify-center text-xl text-main-green">
          <p>{menuItems.message}</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
