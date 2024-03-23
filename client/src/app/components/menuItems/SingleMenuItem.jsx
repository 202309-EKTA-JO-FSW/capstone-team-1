"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchSingleMenuItem } from "@/app/lib/data";
import ResImage from "../../../../public/image/restaurant-placeholder.png";
import Image from "next/image";
import Btn from "../Btn";
import MenuItemImg from "../../../../public/image/menuItem-image-placeholder.png";
import { menuItemsUrl } from "@/app/lib/utils";
const SingleMenuItem = ({ id }) => {
  //   const [loading, setLoading] = useState(false);
  //   const [menuItem, setMenuItem] = useState({});

  //   useEffect(() => {
  //     const getSingleMenuItem = async () => {
  //       setLoading(true);
  //       const menuItemData = await fetchSingleMenuItem( id);
  //       setMenuItem(menuItemData);
  //         console.log(menuItemData)
  //       setLoading(false);
  //     };

  //     getSingleMenuItem();
  //   }, []);

  return (
    <div className="grid grid-cols-2">
      {/* Left section */}
      <div className="flex flex-col justify-center items-start px-4 m-2 ml-4">
        <div className="flex items-center space-x-2">
          <div className="w-[96px] h-[96px]">
            <Image
              src={ResImage}
              alt="Menu Item Image"
              width={100}
              height={100}
              className="relative rounded"
            />
          </div>
          <div>
            {/* to be replaced with {restaurant.name} */}
            <h2 className="text-xl font-bold">The Healthy Corner</h2>
          </div>
        </div>
        <div className="mt-4 p-2">
          <div className="flex justify-between m-2 ">
            {/* to be replaced with {menuItem.name} */}
            <h1 className="text-xl font-bold justify-start">Salad</h1>
            {/* to be replaced with `${menuItem.price} JOD` */}
            <h1 className="text-xl font-bold justify-end">3 JOD</h1>
          </div>
          <div className="p-1 m-2">
            {/* to be replaced with {menuItem.description} */}
            <p>
              Immerse yourself in Middle Eastern flavors with our Fattoush
              salad. Crisp lettuce, juicy tomatoes, and crunchy cucumbers mingle
              with fragrant herbs and toasted pita. Tossed in a zesty dressing,
              it's a burst of freshness in every bite.
            </p>
          </div>
          <div className="flex justify-center pt-5">
            <div>
              <Btn text="Add to Cart" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <Image src={MenuItemImg} width={300} height={300} />
      </div>
    </div>
  );
};

export default SingleMenuItem;
