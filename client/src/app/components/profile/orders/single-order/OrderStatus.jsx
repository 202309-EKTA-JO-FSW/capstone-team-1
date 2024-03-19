import React from "react";

const OrderStatus = ({ status }) => {
  // set color according to status
  const cardColor = () => {
    let statusColor;
    switch (status) {
      case "accepted" || "cooking" || "completed":
        statusColor = "bg-green-100";
        break;
      case "canceled":
        statusColor = "bg-red-100";
        break;
      default:
        statusColor = "";
    }

    return statusColor;
  };
  return (
    <div className=" w-full capitalize">
      <div
        className={`${cardColor()} flex justify-center items-center capitalize w-full text-black border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-base px-5 py-2.5 text-center`}
      >
        {status}
      </div>
    </div>
  );
};

export default OrderStatus;
