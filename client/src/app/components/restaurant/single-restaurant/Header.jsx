"use client";
import Image from "next/image";
import menuitemPlaceholderImage from "../../../../../public/image/menuItem-image-placeholder.png";

const Header = ({ restaurant }) => {
  return (
    <div className="bg-green-500 w-full flex justify-center mb-[30px] px-2 py-5 md:p-10">
      <div className="flex flex-col md:flex-row items-center w-[700px] md:p-5">
        <Image
          src={restaurant.image || menuitemPlaceholderImage}
          alt={restaurant.name}
          width={200}
          height={200}
          priority={true}
          className="w-[160px] h-[160px] rounded-full object-cover"
        />
        <div className="ml-8 mt-5">
          <h1 className="text-3xl font-bold text-black">{restaurant.name}</h1>
          <p className="text-white">{restaurant.description}</p>
          <div className="flex items-center mt-2">
            <span className="text-black">{restaurant.rating || 4.5}</span>
            &#9733;
            <span className="text-gray-700 ml-2">({restaurant.cuisine})</span>
            {restaurant.contact.phoneNumber && (
              <>
                <span className="text-black ml-2">|</span>
                <span className="text-black ml-2">
                  Phone: {restaurant.contact.phoneNumber}
                </span>
              </>
            )}
            {restaurant.contact.email && (
              <>
                <span className="text-black ml-2">|</span>
                <span className="text-black ml-2">
                  Email: {restaurant.contact.email}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
