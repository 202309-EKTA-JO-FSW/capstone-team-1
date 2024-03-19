"use client";
import React, { useEffect, useState } from "react";
import RestaurantForm from "./RestaurantForm";
import { getAdminRestaurant } from "@/app/lib/data";

function RestaurantFormContainer() {
  const [restaurantData, setRestaurantData] = useState({});

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
      setRestaurantData({}); // No need to fetch data if resId is not provided
      console.log(restaurantData);
    }
  }, []);

  if (!restaurantData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full flex justify-center">
      {/* {restaurantData ? (
        <RestaurantForm
          restaurantData={restaurantData}
          setRestaurantData={setRestaurantData}
        />
      ) : (
        <RestaurantForm />
      )} */}
      <RestaurantForm
        restaurantData={restaurantData}
        setRestaurantData={setRestaurantData}
      />
    </div>
  );
}

export default RestaurantFormContainer;
