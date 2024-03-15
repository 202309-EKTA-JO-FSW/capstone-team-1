"use client";
import { fetchCart } from "@/app/lib/data";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [user, setUser] = useState({});
  let cart;
  if (user) cart = user.cart;
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchCart();
      setUser(data);
    };
    fetchUser();
  }, []);
  console.log(user);
  return <div>Cart</div>;
};

export default Cart;
