"use client";
import Loading from "@/app/components/loading/Loading";
import { fetchSingleUserOrder } from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import OrderInfo from "./OrderInfo";

const SingleOrder = ({ id }) => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch order
    const fetchOrder = async () => {
      setLoading(true);
      const orderData = await fetchSingleUserOrder(id);
      setOrder(orderData);
      setLoading(false);
    };
    fetchOrder();
  }, []);

  console.log(order);

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
  return (
    <div className="flex flex-col items-center w-full my-10 px-5 md:px-[60px] lg:px-[120px] xl:px-[300px]">
      <h1 className="text-3xl font-bold text-main-green mb-7">Your Order</h1>
      <OrderInfo order={order} />
    </div>
  );
};

export default SingleOrder;
