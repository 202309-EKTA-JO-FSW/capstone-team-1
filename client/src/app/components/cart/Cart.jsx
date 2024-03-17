"use client";
import { fetchCancelCart, fetchCart, fetchUpdateCart } from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Btn from "../Btn";
import LoadingBtn from "../LoadingBtn";

const Cart = ({ form, loading, setLoading, cart, setCart }) => {
  const [clickedItem, setClickedItem] = useState("");
  const [cancelLoadingBtn, setCancelLoadingBtn] = useState(false);

  // fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      // fetch cart
      const data = await fetchCart();
      setCart(data);
      setLoading(false);
    };
    fetchCartData();
  }, []);

  // handle update
  useEffect(() => {
    if (clickedItem) {
      // Check if clickedItem has a truthy value
      const updateCart = async () => {
        const update = await fetchUpdateCart(
          clickedItem.id,
          clickedItem.status
        );

        if (update) {
          const data = await fetchCart();

          // update the length count in local storage
          let cartLength = data.itemsCount;
          if (!data.menuItems) {
            localStorage.removeItem("cart");
          } else if (data.menuItems) {
            localStorage.setItem(
              "cart",
              JSON.stringify({ length: cartLength })
            );
          }
          window.dispatchEvent(new Event("storage"));

          setCart(data);
        }
      };
      updateCart();
    }
  }, [clickedItem]);

  // handle cancel the cart
  const handleCancel = async () => {
    const cancelCart = await fetchCancelCart();

    if (cancelCart.message === "Cart deleted successfully") {
      const data = await fetchCart();
      // remove the cart from local host to not show the length on navbar
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));
      setCancelLoadingBtn(false);
      setCart(data);
    }
  };

  // handle checkout
  const handleCheckout = () => {};

  // loading
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center">
        <p className="text-3xl font-bold text-main-green">Loading...</p>
      </div>
    );
  }

  // message when cart is empty
  if (cart.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center">
        <p className="text-3xl font-bold text-main-green">Cart Empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full md:p-7">
      <h1 className="text-lg md:text-3xl font-bold m-5">Cart </h1>
      <div className="flex flex-col items-center lg:h-[500px] lg:justify-between w-full p-5 mb-10 rounded-xl bg-slate-100 bg-opacity-20 shadow-[0_5px_10px_5px_rgba(0,0,0,0.1)]">
        <div className="w-full">
          <h1 className="text-xl font-bold mb-5">{cart.restaurant}</h1>
          <div className="w-full mb-10">
            {cart.menuItems &&
              cart.menuItems.map((cart) => (
                <div key={cart.menuItem._id}>
                  <ItemCard cart={cart} setClickedItem={setClickedItem} />
                </div>
              ))}
          </div>
        </div>
        <div className="w-full">
          <div className="text-xl my-5 border-b border-[#dedede] w-full">
            <p className="text-center">
              Total:{" "}
              <span className="font-bold text-2xl">{cart.subtotal} $</span>
            </p>
          </div>
          <div className="w-full flex justify-around my-3">
            <button
              onClick={handleCancel}
              className="bg-gray-300 font-bold w-[120px] h-[44px] text-center rounded-3xl text-white text-sm hover:bg-opacity-75"
            >
              {cancelLoadingBtn ? <LoadingBtn /> : "Cancel"}
            </button>
            <Btn text={"Checkout"} onClick={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
