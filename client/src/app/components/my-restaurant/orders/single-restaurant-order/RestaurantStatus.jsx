import {
  fetchSingleRestaurantOrder,
  fetchUpdateRestaurantOrder,
} from "@/app/lib/data";
import React, { useState } from "react";

function RestaurantStatus({ order, setOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const btnColor = () => {
    let statusColor;
    switch (order.status) {
      case "accepted":
      case "cooking":
      case "completed":
        statusColor = "bg-green-200";
        break;
      case "canceled":
        statusColor = "bg-red-100";
        break;
      default:
        statusColor = "";
    }

    return statusColor;
  };

  const status = ["accepted", "cooking", "completed", "delivered"];

  // change status
  const handleStatus = async (currentStatus) => {
    const orderStatus = await fetchUpdateRestaurantOrder(order._id, {
      status: currentStatus,
    });
    setIsOpen(!isOpen);
    if (orderStatus) {
      const updatedOrder = await fetchSingleRestaurantOrder(order._id);
      setOrder(updatedOrder);
    }
  };

  if (order.status === "delivered" || order.status === "canceled") {
    return (
      <div className=" w-full capitalize my-3">
        <div
          onClick={toggleDropdown}
          className={`${btnColor()} flex justify-center items-center capitalize w-full text-black border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-base px-5 py-2.5 text-center`}
        >
          {order.status}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full capitalize my-3">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className={`${btnColor()} flex justify-center items-center capitalize w-full text-black border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-base px-5 py-2.5 text-center`}
        type="button"
      >
        {order.status}
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 divide-y divide-gray-100 rounded-lg shadow w-full bg-gray-700 absolute top-full mt-1"
        >
          <ul className="py-2 text-sm text-gray-200 text-center">
            {status.map((aStatus, i) => (
              <div key={i}>
                <p
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-600"
                  onClick={() => handleStatus(aStatus)}
                >
                  {aStatus}
                </p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RestaurantStatus;
