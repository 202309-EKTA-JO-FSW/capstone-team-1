"use client";
import Image from "next/image";
import menuitemPlaceholderImage from "../../../../../public/image/menuItem-image-placeholder.png";

const Header = ({ restaurant }) => {
  return (
    <header className="relative top-0 left-0 bg-green-500 w-full h-48 flex justify-center mb-28">
      <div className="absolute flex flex-col md:flex-row items-center px-8 mt-10  md:mt-0 py-4">
        <Image
          src={restaurant.image || menuitemPlaceholderImage}
          alt={restaurant.name}
          width={200}
          height={200}
          priority={true}
          className="w-[160px] h-[160px] rounded-full object-cover  mt-12"
        />

        <div className="ml-8 mt-5 md:mt-48">
          <h1 className="text-3xl font-bold text-black">{restaurant.name}</h1>
          <p className="text-black">{restaurant.description}</p>
          <div className="flex items-center mt-2">
            <span className="text-black">{restaurant.rating || 4.5}</span>
            &#9733;
            <span className="text-gray-400 ml-2">({restaurant.cuisine})</span>
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
    </header>
  );
};

export default Header;
