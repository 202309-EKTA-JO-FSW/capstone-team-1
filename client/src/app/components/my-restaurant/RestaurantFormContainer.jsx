"use client";
import React, { useEffect, useState } from "react";
import RestaurantForm from "./RestaurantForm";
import { getAdminRestaurant } from "@/app/lib/data";

function RestaurantFormContainer() {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const resId = storedUser.restaurant;
    const fetchRestaurantData = async () => {
      try {
        const adminRestaurant = await getAdminRestaurant();

        setRestaurantData(adminRestaurant.restaurant);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    if (resId) {
      fetchRestaurantData();
    } else {
      setRestaurantData(null); // No need to fetch data if resId is not provided
    }
  }, []);

  if (!restaurantData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full flex justify-center">
      {restaurantData ? (
        <RestaurantForm restaurantData={restaurantData} />
      ) : (
        <RestaurantForm />
      )}
    </div>
  );
}

export default RestaurantFormContainer;
