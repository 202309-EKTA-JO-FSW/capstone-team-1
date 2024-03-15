"use client";
import React, { useState, useEffect } from "react";
import { fetchMenuItems} from "@/app/lib/data";

import MenuItemCard from "./MenuItemCard";
import Link from "next/link";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]); 
  
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  

  const getMenuItems = async () => {
    try {
      
     const menuItemsData = await fetchMenuItems( page, limit);
      
      setMenuItems(menuItemsData.menuItems);
      setTotalPages(menuItemsData.totalPages);
    } catch (error) {
      console.error("Error fetching Menu Items:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  

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
        </div>
       
      </div>
    </div>
  );
}

export default MenuItems;
