"use client";
import React, { useState, useEffect } from "react";
import { fetchRestaurants, searchRestaurant } from "@/app/lib/data";
import Pagination from "./Pagination";
import RestaurantCard from "./RestaurantCard";
import Link from "next/link";
import Loading from "../loading/Loading";
import Empty from "../Empty";
import SearchBar from "../SearchBar";

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

  return (
    <div className="flex flex-col justify-start items-center px-3 lg:px-[8%] w-full mt-20">
      <h1 className="flex justify-center font-bold text-5xl w-full">
        Restaurants
      </h1>
      <div className="flex flex-wrap justify-center p-7 w-[80%] md:w-[50%] my-7">
        <SearchBar
          searchTxt={searchTxt}
          setSearchTxt={setSearchTxt}
          placeholder={"Search for restaurant"}
        />
      </div>
      {/* loading display */}
      {loading && <Loading />}
      {/* if There is no restaurnats  */}
      {restaurants.length === 0 && <Empty text={"No restaurant found"} />}
      <div className="w-full flex flex-wrap justify-center lg:justify-start">
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
