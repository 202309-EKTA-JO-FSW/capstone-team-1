"use client";
import { useState } from "react";
import CartInfo from "./CartInfo";
import UserInfo from "./UserInfo";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  // form data
  const [form, setForm] = useState({
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
  });

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center w-full mt-10 px-7">
      <CartInfo
        form={form}
        loading={loading}
        setLoading={setLoading}
        cart={cart}
        setCart={setCart}
      />
      <UserInfo
        form={form}
        setForm={setForm}
        loading={loading}
        setLoading={setLoading}
        cart={cart}
      />
    </div>
  );
};

export default Cart;
