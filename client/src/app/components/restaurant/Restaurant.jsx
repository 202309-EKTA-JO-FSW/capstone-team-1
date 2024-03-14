"use client";
import React, { useState, useEffect } from "react";
import { fetchRestaurants, searchRestaurant } from "@/app/lib/data";
import Pagination from "./Pagination";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search";
import Link from "next/link";

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]); // Initialize with an empty array
  const [searchTxt, setSearchTxt] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const getRestaurants = async () => {
    try {
      let restaurantsData = [];
      if (searchTxt) {
        restaurantsData = await searchRestaurant(searchTxt, page, limit);
      } else {
        restaurantsData = await fetchRestaurants(page, limit);
      }
      setRestaurants(restaurantsData.restaurants);
      setTotalPages(restaurantsData.totalPages);
    } catch (error) {
      console.error("Error getting restaurants:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [searchTxt, page, limit]);

  const handleSearchValue = (event) => {
    setSearchTxt(event.target.value);
    setPage(1);
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex flex-col justify-start items-center p-4 md:p-8 lg:p-12 w-full">
      <h1 className="flex justify-center font-bold text-5xl w-full">
        Restaurants
      </h1>
      <div className="flex flex-wrap justify-center p-7 w-full">
        <Search
          value={searchTxt}
          onChange={handleSearchValue}
          onSubmit={getRestaurants}
        />
      </div>
      <div className="flex-grow w-full relative">
        <div className="relative w-full flex flex-wrap md:flex-row md:justify-start md:p-8">
          {loading ? (
            <p className="font-bold text-2xl">Loading...</p>
          ) : restaurants && restaurants.length > 0 ? ( // Check if restaurants is not null or undefined
            restaurants.map((restaurant) => (
              <Link href={`/restaurant/${restaurant._id}`}>
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-64">
              <p className="font-bold text-2xl">No restaurants found</p>
            </div>
          )}
        </div>
        {restaurants &&
          restaurants.length > 0 && ( // Check if restaurants is not null or undefined
            <div className="w-full flex justify-center items-center mt-8 ">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                handlePagination={handlePagination}
              />
            </div>
          )}
      </div>
    </div>
  );
}

export default Restaurant;
