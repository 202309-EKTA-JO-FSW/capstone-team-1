import React from "react";
import moment from "moment";

const RestaurantOrderCard = ({ order }) => {
  // set time using moment package
  const time = moment(order.createdAt).fromNow();

  const cardColor = () => {
    let statusColor;
    switch (order.status) {
      case "accepted" || "cooking" || "completed":
        statusColor = "bg-green-100";
        break;
      case "canceled":
        statusColor = "bg-red-100";
        break;
      default:
        statusColor = "";
    }
    console.log();
    return statusColor;
  };

  return (
    <div className={`order-card ${cardColor()}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold my-3">
          {order.customer.firstName + " " + order.customer.lastName || "--"}
        </h1>
        <p className="text-sm md:text-base text-gray-500">{time}</p>
      </div>
      <div className="h-[1px] bg-gray-300"></div>
      <div className="flex justify-between my-3">
        <div className="flex text-base">
          <p className="mr-5">Items: {order.itemsCount}</p>
          <p className="mr-5">Total: {order.total}</p>
        </div>
        <p className="text-base md:text-lg">
          status: <span className="font-bold">{order.status || "open"}</span>
        </p>
      </div>
    </div>
  );
};

export default RestaurantOrderCard;
