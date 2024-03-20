import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import restaurantPlateSVG from "../../../../public/image/restaurant-svg.svg";

function RestaurantCard({ restaurant }) {
  return (
    <div className="h-[350px] w-full sm:w-[250px] m-1 sm:m-6 flex flex-col bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:bg-violet-100">
      <div className="relative h-[250px] w-full mb-2 rounded overflow-hidden">
        <Image
          src={restaurant.image || restaurantPlateSVG}
          alt={restaurant.name}
          sizes="200vw"
          priority={true}
          className="object-cover"
          fill
        />
      </div>
      <div className="p-2">
        <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
        <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
        <div className="flex items-center">
          <FaStar className=" text-yellow-300" />
          <span className="text-gray-600 ml-1">4.5</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
