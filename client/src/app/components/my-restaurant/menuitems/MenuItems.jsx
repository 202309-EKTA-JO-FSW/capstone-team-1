"use client";
import React, { useState, useEffect } from "react";
import { fetchMenuItem } from "@/app/lib/data";

import MenuItemCard from "./MenuItemCard";
import Link from "next/link";
import Btn from "../../Btn";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const restaurantId = storedUser.restaurant;

    const getMenuItems = async () => {
      try {
        setLoading(false);
        const menuItemsData = await fetchMenuItem(restaurantId);
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error fetching Menu Items:", error.message);
        setLoading(false);
      }
    };
    getMenuItems();
  }, []);

  return (
    <div className="p-2 md:p-5 lg:p-8 w-full">
      <h1 className="font-bold text-3xl  mb-4">Menu Items</h1>

      <div className="flex flex-wrap justify-start">
        {loading ? (
          <p className="font-bold text-base">Loading...</p>
        ) : menuItems && menuItems.length > 0 ? (
          menuItems.map((menuItem) => (
            <MenuItemCard key={menuItem._id} menuItem={menuItem} />
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
