"use client";
import React, { useState, useEffect } from "react";
import { fetchMenuItem } from "@/app/lib/data";

import MenuItemCard from "./MenuItemCard";
import Link from "next/link";
import Btn from "../../Btn";
import Empty from "../../Empty";
import Loading from "../../loading/Loading";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const restaurantId = storedUser.restaurant;
    const getMenuItems = async () => {
      setLoading(true);
      const menuItemsData = await fetchMenuItem(restaurantId);
      setMenuItems(menuItemsData);
      setLoading(false);
    };
    getMenuItems();
  }, []);

  const handleDelete = async (deletedItem) => {
    const updatedMenuItems = menuItems.filter((item) => item !== deletedItem);
    setMenuItems(updatedMenuItems);
    const menuItemsData = await fetchMenuItem(restaurantId);
    setMenuItems(menuItemsData);
    // getMenuItems();
  };

  return (
    <div className=" flex flex-col justify-center  w-full p-5 md:mx-2 border border-white">
      <h1 className="items-center font-bold text-3xl mb-2 text-center">
        Menu Items
      </h1>
      {/* display loading */}
      {loading && <Loading />}
      <div className="mb-40">
        {/* display empty cart */}
        {menuItems.length === 0 && (
          <Empty text={"Restaurant doesn't have any menu items"} />
        )}
      </div>

      {/* diplay menuItems */}
      <div className="flex flex-wrap  sm:p-2 p-3">
        {menuItems > 0 &&
          menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem._id}
              menuItem={menuItem}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <div className="flex justify-center mt-10s">
        <Link href="/my-restaurant/menuItems/newMenuItem">
          <Btn text="Add Item" />
        </Link>
      </div>
    </div>
  );
}

export default MenuItems;
