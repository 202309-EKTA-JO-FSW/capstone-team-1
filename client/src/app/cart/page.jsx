"use client";
import { useEffect, useState } from "react";
import Cart from "../components/cart/Cart";
import { useAppSelector } from "../redux/hooks";
import IsLogin from "../components/isLogin/IsLogin";

const CartPage = () => {
  const [loading, setLoading] = useState(true);

  const user = useAppSelector((state) => state.authReducer.value);

  useEffect(() => {
    if (user) {
      setLoading(false); // Set loading to false to skip form rendering
    }
  }, [user]);

  if (loading) {
    return null;
  }

  // checking if user is logged in
  if (user.isLogin === false) {
    return <IsLogin login={user.isLogin} />;
  }

  return (
    <div>
      <Cart />
    </div>
  );
};

export default CartPage;
