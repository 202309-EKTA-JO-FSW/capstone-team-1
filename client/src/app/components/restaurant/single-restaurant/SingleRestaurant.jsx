"use client";

import { useEffect } from "react";
import RestaurantMenu from "./RestaurantMenu";
import Header from "./Header";
import { fetchSingleRestaurant } from "@/app/lib/data";
import { useState } from "react";
import SearchBar from "../../SearchBar";
import ReviewCard from "./ReviewCard";
import Loading from "../../loading/Loading";

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
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center ">
      <Header restaurant={restaurant} />

      <div className="mt-10 w-full flex flex-col items-center px-3 lg:px-[6%]">
        <div className="flex items-center justify-center w-[80%] md:w-[50%] mb-7">
          <SearchBar
            placeholder={"Search Menu"}
            searchTxt={searchTxt}
            setSearchTxt={setSearchTxt}
          />
        </div>
        <RestaurantMenu id={id} searchTxt={searchTxt} />
      </div>
      <div className="my-8 text-center">
        <h2 className="text-xl font-semibold mb-4 mt-20">Reviews</h2>
        <ReviewCard />
      </div>
    </div>
  );
};

export default SingleRestaurant;
