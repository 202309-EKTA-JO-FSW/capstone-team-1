"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { fetchRestaurantMenuItems, fetchSearchMenuItem } from "@/app/lib/data";

const RestaurantMenu = ({ id, searchTxt }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMenuItems = async () => {
      console.log("here");
      if (!searchTxt) {
        setLoading(true);
        const menuItemsData = await fetchRestaurantMenuItems(id);
        setMenuItems(menuItemsData);
        setLoading(false);
      } else {
        setLoading(true);
        const searchMenuItemsData = await fetchSearchMenuItem(id, searchTxt);
        setMenuItems(searchMenuItemsData);
        setLoading(false);
      }
    };
    getMenuItems();
  }, [id, searchTxt]);

  if (menuItems.message) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-2xl font-bold text-main-green">
        <p>{menuItems.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-2xl font-bold text-main-green">
        <p>Loading...</p>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-2xl font-bold text-main-green">
        <p>No Menu Items Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center md:justify-start w-full min-h-[400px] px-2 md:px-20 my-10">
      {menuItems.map((item) => (
        <div key={item._id}>
          <MenuItemCard key={item.id} menuItem={item} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
