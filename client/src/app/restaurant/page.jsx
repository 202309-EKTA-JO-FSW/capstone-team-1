"use client";
import React, { useState, useEffect } from "react";
import fetchRestaurants from "../lib/data";
import RestaurantCard from "../components/Restaurant/RestaurantCard";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurantsData = await fetchRestaurants();
        console.log(restaurantsData);
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error("Error getting restaurants:", error.message);
      }
    };
    getRestaurants();
  }, []);

  return (
    <div class=" p-4 md:p-8 lg:p-12 w-full ">
      <h1 class="flex justify-center font-bold text-5xl">Restaurants</h1>
      <div class="flex justify-center p-7">
        <div class="relative w-4/5 max-w-lg">
          <input
            type="search"
            id="location-search"
            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-200"
            placeholder="Search for restaurant"
          />
          <button
            type="submit"
            class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-gray-600 rounded-lg border hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>

      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
