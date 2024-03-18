import React from "react";
import RestaurantMenu from "@/app/components/restaurant/single-restaurant/RestaurantMenu";
import Header from "@/app/components/restaurant/single-restaurant/Header";
import SingleSearch from "@/app/components/restaurant/single-restaurant/singleSearch";
import ReviewCard from "@/app/components/restaurant/single-restaurant/ReviewCard";

const MenuItemsPage = ({ params }) => {
  const id = params.id;
  return (
    <div className="flex flex-col items-center">
      <Header id={id}/>
      {/* <div className="mt-16 flex flex-col items-center w-full"> 
        <div className="flex items-center w-full justify-center">

          <SingleSearch />
        </div>
      </div> */}
      <div className="mt-20"> 
        <RestaurantMenu id={id} />
      </div>
      <div className="mt-8"> 
        <h2 className="text-xl font-semibold mb-4 mt-20">Reviews</h2>
        < ReviewCard className="mb-16"/>
      </div>
    </div>
  );
};

export default MenuItemsPage;
