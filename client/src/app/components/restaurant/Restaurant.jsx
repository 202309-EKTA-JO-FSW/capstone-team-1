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
  // const [hasMore, setHasMore] = useState(true);

  const getRestaurants = async () => {
    try {
      let restaurantsData = [];
      console.log(searchTxt);
      if (searchTxt) {
        restaurantsData = await searchRestaurant(searchTxt, page, limit);
      } else {
        restaurantsData = await fetchRestaurants(page, limit);
        console.log(restaurantsData);
      }
      setRestaurants(restaurantsData);
    } catch (error) {
      console.error("Error getting restaurants:", error.message);
    } finally {
      setLoading(false); // Update loading state when data fetching is completed
    }
  };
  useEffect(() => {
    getRestaurants();
  }, [searchTxt, page, limit]);

  const handleSearchValue = (event) => {
    setSearchTxt(event.target.value);
    console.log(searchTxt);
    setPage(1);
  };
  const handleSearchSubmit = () => {
    getRestaurants();
  };
  /* const handleNextPage = () => {
      setPage((prevPage) => prevPage + 1);
    }; */
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="flex flex-col justify-start items-center p-4 md:p-8 lg:p-12 w-full">
      <h1 className="flex justify-center font-bold text-5xl w-full">
        Restaurants
      </h1>
      <div className="flex justify-center p-7 w-full">
        <Search
          value={searchTxt}
          onChange={handleSearchValue}
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="relative w-full flex flex-col md:flex-row md:justify-center md:p-8">
        {loading ? (
          <p className="font-bold text-2xl">Loading...</p>
        ) : restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p className="font-bold text-2xl">No restaurants found</p>
        )}
      </div>

      <Pagination
        length={restaurants.length}
        limit={limit}
        handlePagination={handlePagination}
      />
    </div>
  );
}

export default Restaurant;
