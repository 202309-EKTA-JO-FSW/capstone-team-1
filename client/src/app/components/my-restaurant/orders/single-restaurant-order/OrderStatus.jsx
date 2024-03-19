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
    <div className={`p-4 text-xl w-full text-center rounded-md ${cardColor()}`}>
      <p>Status: {status}</p>
    </div>
  );
};

export default OrderStatus;
