import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="w-full border border-gray-400 text-xl p-3 rounded my-5">
      <h1 className=" text-2xl font-bold my-3">{order.restaurant.name}</h1>
      <div className="h-[1px] bg-gray-300"></div>
      <div className="flex my-3">
        <p className="mr-5">Items: {order.itemsCount}</p>
        <p className="mr-5">Total: {order.total}</p>
      </div>
    </div>
  );
};

export default OrderCard;
