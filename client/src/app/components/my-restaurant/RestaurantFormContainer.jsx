"use client";
import React, { useEffect, useState } from "react";
import RestaurantForm from "./RestaurantForm";
import { getAdminRestaurant } from "@/app/lib/data";
import Loading from "../loading/Loading";

function RestaurantFormContainer() {
  const [restaurantData, setRestaurantData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    return <Loading />;
  }

  return (
    <div className="w-full flex justify-center px-3 lg:px-[17%]">
      <RestaurantForm
        restaurantData={restaurantData}
        setRestaurantData={setRestaurantData}
      />
    </div>
  );
}

export default RestaurantFormContainer;
