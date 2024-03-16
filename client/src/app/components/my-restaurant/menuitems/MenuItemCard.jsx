import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";

const MenuItemCard = ({ menuItem }) => {
  return (
    <div className="h-[400px] w-full sm:w-[250px] m-1 sm:m-6 flex flex-col justify-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:bg-violet-100">
      <div className="h-[400px] flex justify-center items-center p-1 rounded">
        <Image
          src={menuItem.image}
          alt={menuItem.name}
          width={300}
          height={10}
          className="rounded"
          priority="true"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{menuItem.name}</h2>
        <p className="text-gray-600 mb-2">{menuItem.type}</p>
        <div>
          <Link
            href={`/my-restaurant/menuItems/${menuItem._id}/singleMenuItem`}
          >
            <MdModeEdit />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
