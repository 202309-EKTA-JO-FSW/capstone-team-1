import SingleRestaurantOrder from "@/app/components/my-restaurant/orders/single-restaurant-order/SingleRestaurantOrder";
import React from "react";

const SingleRestaurantOrderPage = ({ params }) => {
  const { id } = params;
  return <SingleRestaurantOrder id={id} />;
};

export default SingleRestaurantOrderPage;
