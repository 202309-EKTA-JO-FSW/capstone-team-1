"use client";
import React, { useState, useEffect } from "react";
import { fetchAdminMenuItem } from "@/app/lib/data";
import { CiFilter } from "react-icons/ci";

import MenuItemCard from "./MenuItemCard";
import Link from "next/link";
import Btn from "../../Btn";
import Empty from "../../Empty";
import Loading from "../../loading/Loading";

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentType, setCurrentType] = useState("");

  useEffect(() => {
    const getMenuItems = async () => {
      setLoading(true);
      const menuItemsData = await fetchAdminMenuItem();
      if (menuItemsData.length > 0) setCurrentType(menuItemsData[0].type);
      setMenuItems(menuItemsData);
      setLoading(false);
    };
    getMenuItems();
  }, []);

  const handleDelete = async (deletedItem) => {
    const updatedMenuItems = menuItems.filter((item) => item !== deletedItem);
    setMenuItems(updatedMenuItems);
    const menuItemsData = await fetchAdminMenuItem();
    setMenuItems(menuItemsData);
    // getMenuItems();
  };

  const handleUpdate = async () => {
    setLoading(true);
    const menuItemsData = await fetchAdminMenuItem();
    setMenuItems(menuItemsData);
    setLoading(false);
  };

  ////

  // filter menuItems
  const types = [];
  menuItems.forEach((item) => {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }
  });

  // filter menuItem with types
  const filteredmenuItems = menuItems.filter(
    (item) => item.type.toLowerCase() === currentType.toLowerCase()
  );

  // filter btn color
  const currentTypeColor = (type) => {
    if (currentType === type) {
      return "bg-light-green border-main-green";
    } else {
      return "bg-transparent border-gray-300";
    }
  };

  return (
    <div className=" flex flex-col justify-center w-full p-5 md:mx-2 border border-white">
      <h1 className="items-center font-bold text-3xl mb-2 text-center">
        Menu Items
      </h1>
      {/* display loading */}
      {loading && <Loading />}
      {/* display empty cart */}
      {menuItems.length === 0 && (
        <Empty text={"Restaurant doesn't have any menu items"} />
      )}

      {/* filter */}
      <div className="flex items-center text-base">
        <div className="border-2 border-gray-300 rounded-full p-3 mr-2">
          <CiFilter />
        </div>
        {types &&
          types.map((type, i) => (
            <div key={i} onClick={() => setCurrentType(type)}>
              <p
                className={` capitalize border-2 rounded-full p-2 mr-2 cursor-pointer hover:bg-light-green hover:border-main-green ${currentTypeColor(
                  type
                )}`}
              >
                {type}
              </p>
            </div>
          ))}
      </div>
      {/* diplay menuItems */}
      <div className="flex flex-wrap sm:p-2 p-3">
        {filteredmenuItems.length > 0 &&
          filteredmenuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem._id}
              menuItem={menuItem}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
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
