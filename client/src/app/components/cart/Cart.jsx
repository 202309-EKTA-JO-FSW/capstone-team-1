"use client";
import { fetchCart, fetchUpdateCart } from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Btn from "../Btn";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [clickedItem, setClickedItem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCart();
      console.log(data);
      setCart(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (clickedItem) {
      // Check if clickedItem has a truthy value
      const fetchData = async () => {
        // setLoading(true);
        const update = await fetchUpdateCart(
          clickedItem.id,
          clickedItem.status
        );

        // const updatedMenuItems = cart.menuItems.map((item) => {
        //   if (item.menuItem._id === clickedItem.id) {
        //     console.log("here");
        //     if (clickedItem.status === "add") {
        //       item.quantity = item.quantity + 1;
        //     } else {
        //       item.quantity = item.quantity - 1;
        //     }
        //     return item;
        //   } else {
        //     return item;
        //   }
        // });
        if (update) {
          // setCart({ ...cart, menuItems: updatedMenuItems });
          const data = await fetchCart();
          setCart(data);
        }
      };
      fetchData();
    }
  }, [clickedItem]);

  // console.log(clickedItem);

  // if (clickedItem) {
  //   const updatedMenuItems = cart.menuItems.map((item) => {
  //     if (item.menuItem._id === clickedItem.id) {
  //       console.log("here");
  //       if (clickedItem.status === "add") {
  //         item.quantity = item.quantity + 1;
  //       } else {
  //         item.quantity = item.quantity - 1;
  //       }
  //       return item;
  //     } else {
  //       return item;
  //     }
  //   });

  //   setCart({ ...cart, menuItems: updatedMenuItems });
  // }

  // let menuItems = cart.menuItems;
  if (loading) return <p>Loading.....</p>;

  if (cart.message) return <p>{cart.message}</p>;

  // console.log(menuItems);
  return (
    <div className="flex flex-col items-center w-full p-2 rounded-xl bg-slate-100 bg-opacity-20 shadow-[0_5px_10px_5px_rgba(0,0,0,0.1)] sm:p-5 md:w-[450px]">
      <h1 className="text-xl font-bold mb-5">{cart.restaurant}</h1>
      <div className="w-full">
        {cart.menuItems &&
          cart.menuItems.map((cart) => (
            <div key={cart.menuItem._id}>
              <ItemCard cart={cart} setClickedItem={setClickedItem} />
            </div>
          ))}
      </div>

      <div className="text-xl my-5 border-b border-[#dedede] w-full">
        <p className="text-center">
          Total: <span className="font-bold text-2xl">{cart.subtotal} $</span>
        </p>
      </div>
      <div className="w-full flex justify-around my-3">
        <button className="bg-gray-300 w-[120px] py-3 text-center rounded-3xl text-white text-sm hover:bg-opacity-75">
          Cancel
        </button>
        <Btn text={"Checkout"} />
      </div>
    </div>
  );
};

export default Cart;
