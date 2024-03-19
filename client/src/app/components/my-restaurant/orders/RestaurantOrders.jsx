"use client";
import { fetchRestaurantOrders } from "@/app/lib/data";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../../loading/Loading";
import RestaurantOrderCard from "./RestaurantOrderCard";

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const orders = await fetchRestaurantOrders();
      setOrders(orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log(orders);

  if (orders.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center">
        <p className="text-3xl font-bold text-main-green">No orders found</p>
      </div>
    );
  }
  return (
    <div className="w-full px-5 md:px-20 mt-5">
      <h1 className="text-4xl mb-8 font-bold">Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <Link href={`/restaurant-order/${order._id}`}>
              <RestaurantOrderCard order={order} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantOrders;
