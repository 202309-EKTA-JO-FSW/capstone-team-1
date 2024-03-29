"use client";
import Loading from "@/app/components/loading/Loading";
import {
  fetchPlaceOrder,
  fetchSingleUserOrder,
  fetchUserCancelOrder,
} from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import OrderInfo from "./OrderInfo";
import RestaurantInfo from "./RestaurantInfo";
import CustomerInfo from "./CustomerInfo";
import LoadingBtn from "../../../loading/LoadingBtn";
import OrderStatus from "./OrderStatus";
import OrderTime from "./OrderTime";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const SingleOrder = ({ id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [cancelLoadingBtn, setCancelLoadingBtn] = useState(false);
  const [placeOrderLoadingBtn, setPlaceOrderlLoadingBtn] = useState(false);
  const [note, setNote] = useState("");

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

  // handle place order
  const handlePlaceOrder = async () => {
    setPlaceOrderlLoadingBtn(true);
    const placeOrder = await fetchPlaceOrder(order._id, note);
    // update the message state
    dispatch(actionMsg(placeOrder.message));

    if (placeOrder) {
      const orderData = await fetchSingleUserOrder(id);
      setPlaceOrderlLoadingBtn(false);
      if (orderData) setOrder(orderData);
    }
  };

  // cancel order
  const handleCancelOrder = async () => {
    setCancelLoadingBtn(true);
    const cancelOrder = await fetchUserCancelOrder(order._id);
    // update the message state
    dispatch(actionMsg(cancelOrder.message));

    if (cancelOrder) {
      setCancelLoadingBtn(false);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center w-full my-10 px-5 md:px-[120px] lg:px-[200px] xl:px-[400px]">
      <h1 className="text-3xl font-bold text-main-green mb-7">Your Order</h1>
      <OrderInfo order={order} />
      <div className="my-8 w-full flex flex-col md:flex-row  justify-around items-center border border-gray-200 rounded-xl bg-gray-50 p-5">
        <RestaurantInfo restaurant={order.restaurant} />
        <CustomerInfo customer={order.customer} />
      </div>
      {/* note */}
      {!order.status && (
        <div className="w-full mb-8">
          <textarea
            name="note"
            className="border w-full bg-gray-50 rounded-md placeholder:text-gray-600 p-3"
            placeholder="Note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
      )}
      {order.status && (
        <div className="w-full mb-8">
          <p className="border w-full bg-gray-50 rounded-md placeholder:text-gray-600 p-3">
            {order.note || "No note"}
          </p>
        </div>
      )}
      {/* order time  */}
      <OrderTime order={order} />
      {/* place order btns */}
      {!order.status && (
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleCancelOrder}
            className="bg-gray-300 text-white w-full p-3 rounded-lg shadow-md hover:bg-opacity-75 mx-2 h-[48px]"
          >
            {cancelLoadingBtn ? <LoadingBtn /> : "Cancel"}
          </button>
          <button
            onClick={handlePlaceOrder}
            className="bg-main-green text-white w-full p-3 rounded-lg shadow-md hover:bg-opacity-75 mx-2 h-[48px]"
          >
            {placeOrderLoadingBtn ? <LoadingBtn /> : "Place Order"}
          </button>
        </div>
      )}
      {order.status && <OrderStatus status={order.status} />}
    </div>
  );
};

export default SingleOrder;
