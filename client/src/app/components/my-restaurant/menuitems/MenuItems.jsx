"use client";
import React, { useState, useEffect } from "react";
import { fetchMenuItems } from "@/app/lib/data";

import MenuItemCard from "./MenuItemCard";
import Link from "next/link";
import Btn from "../../Btn";

function MenuItems({}) {
  const [menuItems, setMenuItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        setLoading(false);
        const menuItemsData = await fetchMenuItems();
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error fetching Menu Items:", error.message);
        setLoading(false);
      }
    };
    getMenuItems();
  }, []);

  console.log(menuItems);
  return (
    <div className="flex flex-col justify-start items-center p-4 md:p-8 lg:p-12 w-full">
      <h1 className="flex justify-center font-bold text-5xl w-full">
        Menu Items
      </h1>

      <div className="flex-grow w-full relative">
        <div className="relative w-full flex flex-wrap md:flex-row md:justify-start md:p-8">
          {loading ? (
            <p className="font-bold text-2xl">Loading...</p>
          ) : menuItems && menuItems.length > 0 ? ( // Check if menuItems is not null or undefined
            menuItems.map((menuItem) => (
              <Link href={`/menuItems/${menuItem._id}`}>
                <MenuItemCard key={menuItem._id} menuItem={menuItem} />
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-64">
              <p className="font-bold text-2xl">No Menu Items found</p>
            </div>
          )}
          
          <div>
            <Link href="/my-restaurant/menuItems/newMenuItem">
              <Btn text={"Add Item"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItems;
