import React from "react";
import Card from "../Card";
import Link from "next/link";
function RestaurantCard({ restaurant }) {
  return (
    <div className="flex flex-row p-4 md:p-8 w-full">
      <Link href={`/menuItems/${restaurant._id}`}>
        <Card>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-40 object-cover object-center rounded-full"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
            <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-500 mr-1"
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
