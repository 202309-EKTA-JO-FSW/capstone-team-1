import React from "react";
import RestaurantMenu from "@/app/components/restaurant/restaurant-single-page/RestaurantMenu";

const MenuItemsPage = ({ params }) => {
  const id = params.id;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold m-10">Menu Items</h1>
      <RestaurantMenu id={id} />
      <div className="m-12">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      </div>
    </div>
  );
};

export default MenuItemsPage;
