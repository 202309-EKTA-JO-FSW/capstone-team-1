"use client";
import React, { useState, useEffect } from "react";
import { fetchMenuItem } from "@/app/lib/data";

import MenuItemCard from "./MenuItemCard";
import Link from "next/link";
import Btn from "../../Btn";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const restaurantId = storedUser.restaurant;
  const getMenuItems = async () => {
    setLoading(true);
    const menuItemsData = await fetchMenuItem(restaurantId);
    setMenuItems(menuItemsData);
    setLoading(false);
  };
  useEffect(() => {
    
    
    getMenuItems();
  }, []);

  const handleDelete = async (deletedItem) => {
    const updatedMenuItems = menuItems.filter((item) => item !== deletedItem);
    setMenuItems(updatedMenuItems);
    getMenuItems();
  };
  return (
    <div className=" flex flex-col justify-center  w-full p-5 md:mx-2 border border-white">
      <h1 className="items-center font-bold text-3xl  mb-2  ">Menu Items</h1>

      <div className="flex flex-wrap  sm:p-2 p-3">
        {loading ? (
          <p className="font-bold text-base">Loading...</p>
        ) : menuItems && menuItems.length > 0 ? (
          menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem._id}
              menuItem={menuItem}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-50">
            <p className="font-bold text-xl">No Menu Items found</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/my-restaurant/menuItems/newMenuItem">
          <Btn text="Add Item" />
        </Link>
      </div>
    </div>
  );
}

export default MenuItems;
