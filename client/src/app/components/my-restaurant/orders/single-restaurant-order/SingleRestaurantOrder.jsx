"use client";
import Loading from "@/app/components/loading/Loading";
import {
  fetchSingleRestaurantOrder,
  fetchUpdateRestaurantOrder,
} from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import RestaurantInfo from "./RestaurantInfo";
import CustomerInfo from "./CustomerInfo";
import OrderStatus from "./OrderStatus";
import OrderTime from "./OrderTime";
import { useRouter } from "next/navigation";
import RestaurantOrderInfo from "./RestaurantOrderInfo";
import RestaurantStatus from "./RestaurantStatus";
import LoadingBtn from "@/app/components/loading/LoadingBtn";

const SingleRestaurantOrder = ({ id }) => {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [cancelLoadingBtn, setCancelLoadingBtn] = useState(false);

  useEffect(() => {
    // fetch order
    const fetchOrder = async () => {
      setLoading(true);
      const orderData = await fetchSingleRestaurantOrder(id);
      setOrder(orderData);
      setLoading(false);
    };
    fetchOrder();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (order.message || !order) {
    return (
      <div className="w-full h-screen flex justify-center">
        <p className="text-3xl font-bold text-main-green">Order not found</p>
      </div>
    );
  }

  const handleCancelOrder = async () => {
    const orderStatus = await fetchUpdateRestaurantOrder(order._id, {
      status: "canceled",
    });

    if (orderStatus) {
      const updatedOrder = await fetchSingleRestaurantOrder(order._id);
      setOrder(updatedOrder);
    }
  };

  return (
    <div className="flex flex-col items-center w-full my-10 px-5 md:px-[120px] lg:px-[250px] xl:px-[400px]">
      <h1 className="text-3xl font-bold text-main-green mb-7">Order</h1>
      <RestaurantStatus order={order} setOrder={setOrder} />
      <RestaurantOrderInfo order={order} />
      <div className="my-8 w-full flex flex-col md:flex-row  justify-around items-center border border-gray-200 rounded-xl bg-gray-50 p-5">
        <RestaurantInfo restaurant={order.restaurant} />
        <CustomerInfo customer={order.customer} />
      </div>

      {/* order time  */}
      <OrderTime order={order} />

      {/* cancel btn */}
      {order.status !== "canceled" && order.status !== "delivered" && (
        <button
          onClick={handleCancelOrder}
          className="bg-red-400 text-white w-full p-3 rounded-lg shadow-md hover:bg-opacity-75 mx-2 h-[48px]"
        >
          {cancelLoadingBtn ? <LoadingBtn /> : "Cancel"}
        </button>
      )}
    </div>
  );
};

export default SingleRestaurantOrder;
