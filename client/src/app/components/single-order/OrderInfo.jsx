import React from "react";
import ItemField from "./ItemField";
import OrderTime from "./OrderTime";

const OrderInfo = ({ order }) => {
  const cartItems = order.cartItems;

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between text-base md:text-lg text-gray-500 w-full p-5 rounded-lg border border-gray-100 shadow-[0_5px_10px_5px_rgba(0,0,0,0.1)]">
        <div>
          {cartItems.map((item) => (
            <div key={item._id}>
              <ItemField item={item} />
            </div>
          ))}
        </div>
        <div className="mt-20">
          <div className="flex justify-between items-center w-full p-1 mb-3 border-b border-[#dedede]">
            <p>Delivery fee</p>
            <p>{order.deliveryFees} JD</p>
          </div>
          <div className="flex justify-between items-center w-full p-1 mb-3 border-b border-[#dedede]">
            <p>Subtotal</p>
            <p>{order.subtotal} JD</p>
          </div>
          <div className="flex justify-between items-center text-black font-bold text-lg md:text-xl w-full p-1 mb-3 border-b border-[#dedede]">
            <p>Total</p>
            <p>{order.total} JD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
