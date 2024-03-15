"use client";
import Image from "next/image";
import menuItemImage from "../../../../../public/image/menuItem-image-placeholder.png";

const MenuItemCard = ({ menuItem }) => {
  if (!menuItem) {
    return <div className="text-center">No items available</div>;
  }

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 flex flex-col items-center mx-4"
      style={{ width: 250, height: 300 }}
    >
      <div className="relative h-48 w-full mb-2">
        <Image
          src={menuItem.image || menuItemImage}
          alt={menuItem.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-lg font-bold text-center mb-6">{menuItem.name}</h3>
      <div className="flex justify-between w-full">
        <div>
          <p className="text-lg font-semibold">{`${menuItem.price} ${
            menuItem.currency || "JOD"
          }`}</p>
        </div>
        <div className="flex items-center">
          <span className="mr-1">{menuItem.rating || 4.5}</span>
          &#9733;
        </div>
      </div>
      <div className="flex justify-center w-full mt-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
