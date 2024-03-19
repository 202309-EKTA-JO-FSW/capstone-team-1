"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { fetchMenuItem, searchMenuItem } from "@/app/lib/data";
import Pagination from "../Pagination";
import SingleSearch from "./singleSearch";

const RestaurantMenu = ({ id }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const menuItems = await fetchMenuItem(id);
      setMenuItems(menuItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    }
  };
  console.log(menuItems);
  const handleSearchValue = (event) => {
    setSearchTxt(event.target.value);
  };

  const searchMenuItems = async () => {
    try {
      setLoading(true);
      const menuItems = await searchMenuItem(searchTxt, currentPage);
      setMenuItems(menuItems);

      setLoading(false);
    } catch (error) {
      console.error("Error searching menu items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTxt) {
      searchMenuItems();
    } else {
      fetchData();
    }
  }, [searchTxt]);

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
          <MenuItemCard key={item.id} menuItem={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mt-16 flex flex-col items-center w-full">
        <div className="flex items-center w-96 justify-center">
          <SingleSearch
            value={searchTxt}
            onChange={handleSearchValue}
            onSubmit={searchMenuItems}
          />
        </div>
      </div>
      {menuItems.length > 0 ? (
        <>
          {renderMenuItems(menuItems)}
          {/* <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePagination={handlePagination}
          /> */}
        </>
      ) : (
        <div className="h-[500px] flex items-center justify-center text-xl text-main-green">
          <p>No menu items found.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
