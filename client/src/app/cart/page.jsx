"use client";
import { useState } from "react";
import Cart from "../components/cart/Cart";
import UserInfo from "../components/cart/UserInfo";

const CartPage = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartEmpty, setCartEmpty] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center w-full mt-24 px-7">
      <Cart
        loading={loading}
        setLoading={setLoading}
        cart={cart}
        setCart={setCart}
      />
      <UserInfo loading={loading} setLoading={setLoading} cart={cart} />
    </div>
  );
};

export default CartPage;
