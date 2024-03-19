"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchSingleRestaurant } from "@/app/lib/data";

const Header = ({ id }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const restaurantData = await fetchSingleRestaurant(id);
        setRestaurant(restaurantData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (loading || !restaurant) {
    return <div>Loading...</div>;
  }

  const { name, description, cuisine, contact, rating, image } = restaurant;

  return (
    <header>
      <div className="absolute inset-0 bg-green-500 w-full h-48 mt-16"></div>
      <div className="relative z-10 flex items-center px-8 py-4">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="w-[160px] h-[160px] rounded-full object-cover  mt-12"
        />

        <div className="ml-8 mt-48">
          <h1 className="text-3xl font-bold text-black">{name}</h1>
          <p className="text-black">{description}</p>
          <div className="flex items-center mt-2">
            <span className="text-black">{rating || 4.5}</span>
            &#9733;
            <span className="text-gray-400 ml-2">({cuisine})</span>
            {contact.phoneNumber && (
              <>
                <span className="text-black ml-2">|</span>
                <span className="text-black ml-2">
                  Phone: {contact.phoneNumber}
                </span>
              </>
            )}
            {contact.email && (
              <>
                <span className="text-black ml-2">|</span>
                <span className="text-black ml-2">Email: {contact.email}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
