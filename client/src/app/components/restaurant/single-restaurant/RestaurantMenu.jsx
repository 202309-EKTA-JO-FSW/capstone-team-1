"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { fetchMenuItem, searchMenuItem } from "@/app/lib/data";
import Pagination from "../Pagination";

import SearchBar from "../../SearchBar";

const RestaurantMenu = ({ menuItems, setMenuItems }) => {
  // const [loading, setLoading] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-40">
  //       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center w-[40%]">
        <SearchBar
          placeholder={"Search Menu"}
          searchTxt={searchTxt}
          setSearchTxt={setSearchTxt}
        />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} menuItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
