"use client";
import React, { useEffect, useState } from "react";
import RestaurantForm from "./RestaurantForm";
import { getAdminRestaurant } from "@/app/lib/data";

function RestaurantFormContainer() {
  const [restaurantData, setRestaurantData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*  const storedUser = JSON.parse(localStorage.getItem("user"));
    const resId = storedUser.restaurant; */
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const adminRestaurant = await getAdminRestaurant();
        setRestaurantData(adminRestaurant.restaurant);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    fetchRestaurantData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full flex justify-center px-[25%]">
      <RestaurantForm
        restaurantData={restaurantData}
        setRestaurantData={setRestaurantData}
      />
    </div>
  );
}

export default RestaurantFormContainer;
