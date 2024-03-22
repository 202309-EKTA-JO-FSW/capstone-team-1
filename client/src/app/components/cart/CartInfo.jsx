"use client";
import {
  fetchCancelCart,
  fetchCart,
  fetchCreateOrder,
  fetchUpdateCart,
  fetchUserUpdate,
} from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import Btn from "../Btn";
import LoadingBtn from "../loading/LoadingBtn";
import ItemCart from "./ItemCart";
import Loading from "../loading/Loading";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { itemsCount } from "@/app/redux/features/cart/CartSlice";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const CartInfo = ({ form, loading, setLoading, cart, setCart }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [clickedItem, setClickedItem] = useState("");
  const [cancelLoadingBtn, setCancelLoadingBtn] = useState(false);
  const [checkoutLoadingBtn, setCheckoutLoadingBtn] = useState(false);

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

          // update state itemsCount when add and remove
          let cartLength = data.itemsCount;
          if (!data.menuItems) {
            dispatch(itemsCount(0));
          } else if (data.menuItems) {
            dispatch(itemsCount(cartLength));
          }

          setCart(data);
        }
      };
      updateCart();
    }
  }, [clickedItem]);

  // handle cancel the cart
  const handleCancel = async () => {
    setCancelLoadingBtn(true);
    const cancelCart = await fetchCancelCart();
    // update the message state
    dispatch(actionMsg(cancelCart.message));
    if (cancelCart.message === "Cart deleted successfully") {
      const data = await fetchCart();

      // set itemsCount to zero when cancel the cart
      dispatch(itemsCount(0));
      setCancelLoadingBtn(false);
      setCart(data);
    }
  };

  // handle checkout
  const handleCheckout = async () => {
    setCheckoutLoadingBtn(true);
    // update user info
    const updateUser = await fetchUserUpdate(form);
    // create an order
    const createOrder = await fetchCreateOrder();
    // update the message state
    dispatch(actionMsg(createOrder.message));
    // update the cart
    if (updateUser && createOrder) {
      const cart = await fetchCart();
      setCart(cart);
      setCheckoutLoadingBtn(false);
      // when checkout reset the itemCount to 0
      dispatch(itemsCount(0));
      router.push(`/order/${createOrder.order._id}`);
    }
  };

  // loading
  if (loading) {
    return <Loading />;
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
                  <ItemCart cart={cart} setClickedItem={setClickedItem} />
                </div>
              ))}
          </div>
        </div>
        <div className="w-full">
          <div className="text-xl my-5 border-b border-[#dedede] w-full">
            <p className="text-center">
              Total:{" "}
              <span className="font-bold text-2xl">{cart.subtotal} JD</span>
            </p>
          </div>
          <div className="w-full flex justify-around my-3">
            <button
              onClick={handleCancel}
              className="bg-gray-300 font-bold w-[120px] h-[44px] text-center rounded-3xl text-white text-sm hover:bg-opacity-75"
            >
              {cancelLoadingBtn ? <LoadingBtn /> : "Cancel"}
            </button>
            <div onClick={handleCheckout}>
              <Btn text={"Checkout"} loadingBtn={checkoutLoadingBtn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
