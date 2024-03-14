import React from "react";
import Card from "../Card";
import Link from "next/link";
import Image from "next/image";
import restaurantPlateSVG from "../../../../public/image/restaurant-svg.svg";

function RestaurantCard({ restaurant }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-6 ">
      <Link href={`/restaurant/${restaurant._id}`}>
        <Card>
          <Image
            src={restaurant.image || restaurantPlateSVG}
            alt={restaurant.name}
            className="w-80 h-50 object-cover object-center rounded-full p-2 "
            priority="true"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
            <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
            <div className="flex items-center">
              <svg
                className="w-9 h-5 text-yellow-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v4.297l3.65 1.742a1 1 0 01.316 1.684l-2.65 2.297.8 3.95a1 1 0 01-1.451 1.054L10 15.898l-3.515 1.847a1 1 0 01-1.45-1.054l.8-3.95-2.65-2.297a1 1 0 01.316-1.684L9 8.297V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-600">{restaurant.reviews}</span>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default RestaurantCard;
