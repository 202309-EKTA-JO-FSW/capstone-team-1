"use client";

import { useEffect } from "react";
import RestaurantMenu from "./RestaurantMenu";
import Header from "./Header";
import {
  fetchRestaurantMenuItems,
  fetchSingleRestaurant,
} from "@/app/lib/data";
import { useState } from "react";

const SingleRestaurant = ({ id }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const menuItemsData = await fetchRestaurantMenuItems(id);
      setMenuItems(menuItemsData);
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

      <div className="mt-20">
        <RestaurantMenu menuItems={menuItems} setMenuItems={setMenuItems} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 mt-20">Reviews</h2>
        {/* <ReviewCard className="mb-16" /> */}
      </div>
    </div>
  );
};

export default SingleRestaurant;
