"use client";
import React, { useState, useEffect } from "react";
import { fetchRestaurants, searchRestaurant } from "@/app/lib/data";
import Pagination from "./Pagination";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search";

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
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
      //console.log("restaurantsData.restaurants", restaurantsData.restaurants);
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
          ) : restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))
          ) : (
            <p className="font-bold text-2xl">No restaurants found</p>
          )}
        </div>
        <div className="w-full flex justify-center items-center mt-8 fixed bottom-0">
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
