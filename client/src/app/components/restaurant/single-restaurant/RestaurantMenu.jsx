"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { fetchRestaurantMenuItems, fetchSearchMenuItem } from "@/app/lib/data";
import { CiFilter } from "react-icons/ci";
import Link from "next/link";

const RestaurantMenu = ({ id, searchTxt }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentType, setCurrentType] = useState("");

  // fetch data
  useEffect(() => {
    const getMenuItems = async () => {
      if (!searchTxt) {
        setLoading(true);
        const menuItemsData = await fetchRestaurantMenuItems(id);
        setMenuItems(menuItemsData);

        if (menuItemsData.length > 0) setCurrentType(menuItemsData[0].type);
        setLoading(false);
      } else {
        setLoading(true);
        const searchMenuItemsData = await fetchSearchMenuItem(id, searchTxt);
        setMenuItems(searchMenuItemsData);

        if (searchMenuItemsData.length > 0)
          setCurrentType(searchMenuItemsData[0].type);
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

  // filter menuItems
  const types = [];
  menuItems.forEach((item) => {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }
  });

  // filter menuItem with types
  const filteredmenuItems = menuItems.filter(
    (item) => item.type === currentType
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
    <div className="flex flex-col items-center md:items-start w-full min-h-[400px] px-2 md:px-[5%] my-10">
      <div className="flex items-center text-base">
        <div className="border-2 border-gray-300 rounded-full p-3 mr-2">
          <CiFilter />
        </div>
        {types &&
          types.map((type, i) => (
            <div key={i} onClick={() => setCurrentType(type)}>
              <p
                className={`border-2 rounded-full p-2 mr-2 cursor-pointer hover:bg-light-green hover:border-main-green ${currentTypeColor(
                  type
                )}`}
              >
                {type}
              </p>
            </div>
          ))}
      </div>
      <div className="flex flex-wrap justify-center md:justify-start w-full min-h-[400px]">
        {menuItems.length > 0 &&
          filteredmenuItems.map((item) => (
            <div key={item._id}>
              <Link href={`/restaurant/${id}/${item._id}`}>
                <MenuItemCard key={item.id} menuItem={item} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
