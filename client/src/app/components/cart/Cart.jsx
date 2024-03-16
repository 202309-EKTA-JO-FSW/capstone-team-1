"use client";
import { fetchCart } from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Btn from "../Btn";

const Cart = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCart();
      setCart(data);
    };
    fetchData();
  }, []);
  const menuItems = cart.menuItems;
  console.log(menuItems);
  return (
    <div className="flex flex-col items-center w-full p-2 rounded-xl bg-slate-100 bg-opacity-20 shadow-[0_5px_10px_5px_rgba(0,0,0,0.1)] sm:p-5 md:w-[450px]">
      <h1 className="text-xl font-bold mb-5">{cart.restaurant}</h1>
      <div className="w-full">
        {menuItems &&
          menuItems.map((cart) => (
            <div key={cart.menuItem._id}>
              <ItemCard cart={cart} />
            </div>
          ))}
      </div>

      <div className="text-xl my-5 border-b border-[#dedede] w-full">
        <p className="text-center">
          Total: <span className="font-bold text-2xl">15 $</span>
        </p>
      </div>
      <Btn text={"checkout"} />
    </div>
  );
};

export default Cart;
