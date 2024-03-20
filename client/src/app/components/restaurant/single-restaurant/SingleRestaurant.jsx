"use client";

import { useEffect } from "react";
import RestaurantMenu from "./RestaurantMenu";
import Header from "./Header";
import { fetchSingleRestaurant } from "@/app/lib/data";
import { useState } from "react";
import SearchBar from "../../SearchBar";

const SingleRestaurant = ({ id }) => {
  const [restaurant, setRestaurant] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const restaurantData = await fetchSingleRestaurant(id);
      setRestaurant(restaurantData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <Header restaurant={restaurant} />

      <div className="mt-20 w-full flex flex-col items-center pt-[56px]">
        <div className="flex items-center justify-center w-[40%]">
          <SearchBar
            placeholder={"Search Menu"}
            searchTxt={searchTxt}
            setSearchTxt={setSearchTxt}
          />
        </div>
        <RestaurantMenu id={id} searchTxt={searchTxt} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 mt-20">Reviews</h2>
        {/* <ReviewCard className="mb-16" /> */}
      </div>
    </div>
  );
};

export default SingleRestaurant;