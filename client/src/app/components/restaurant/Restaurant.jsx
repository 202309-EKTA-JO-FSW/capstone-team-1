"use client";
import React, { useState, useEffect } from "react";
import { fetchRestaurants, searchRestaurant } from "@/app/lib/data";
import Pagination from "./Pagination";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search";
import Link from "next/link";
import Loading from "../loading/Loading";

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]); // Initialize with an empty array
  const [searchTxt, setSearchTxt] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
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

    getRestaurants();
  }, [searchTxt, page, limit]);

  const handleSearchValue = (event) => {
    setSearchTxt(event.target.value);
    setPage(1);
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  if (restaurants.length < 0) {
    return <Empty />;
  }

  return (
    <div className="flex flex-col justify-start items-center px-4 md:px-24 w-full mt-20 border">
      <h1 className="flex justify-center font-bold text-5xl w-full">
        Restaurants
      </h1>
      <div className="flex flex-wrap justify-center p-7 w-full">
        <Search value={searchTxt} onChange={handleSearchValue} />
      </div>
      {loading && <Loading />}
      <div className="w-full flex flex-wrap justify-center md:justify-start">
        {!loading &&
          restaurants &&
          restaurants.length > 0 &&
          restaurants.map((restaurant) => (
            <div key={restaurant._id}>
              <Link href={`/restaurant/${restaurant._id}`}>
                <RestaurantCard restaurant={restaurant} />
              </Link>
            </div>
          ))}
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
  );
}

export default Restaurant;
