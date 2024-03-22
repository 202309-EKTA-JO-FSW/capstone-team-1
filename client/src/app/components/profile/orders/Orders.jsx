"use client";
import { fetchUserOrders } from "@/app/lib/data";
import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import OrderCard from "./OrderCard";
import Link from "next/link";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const orders = await fetchUserOrders();
      setOrders(orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
        
        {orders && orders.map((order) => (
          <div key={order._id}>
            <Link href={`/order/${order._id}`}>
              <OrderCard order={order} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
