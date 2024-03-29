"use client";
import React, { useEffect, useState } from "react";
import {
  fetchSingleMenuItem,
  fetchSingleRestaurant,
  fetchPostCart,
} from "@/app/lib/data";
import ResImage from "../../../../../../public/image/restaurant-placeholder.png";
import Image from "next/image";
import Btn from "../../../Btn";
import MenuItemImg from "../../../../../../public/image/menuItem-image-placeholder.png";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { itemsCount } from "@/app/redux/features/cart/CartSlice";
import { useRouter } from "next/navigation";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const SingleMenuItem = ({ resId, menuItemId }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.value);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [menuItem, setMenuItem] = useState({});
  const [restaurant, setRestaurant] = useState({});

  const handleAddToCart = async () => {
    // check if user loged in, if not navigate him to login page
    if (user.isLogin === false) {
      router.push("/login");
    }

    const cart = await fetchPostCart(menuItemId);
    // update the message state
    dispatch(actionMsg(cart.message));

    // change the cart status to added items
    if (user.isLogin && cart) {
      dispatch(itemsCount(cart.results.cart.itemsCount));
    }
  };

  useEffect(() => {
    const getSingleMenuItem = async () => {
      setLoading(true);
      const menuItemData = await fetchSingleMenuItem(resId, menuItemId);
      const restaurantInfo = await fetchSingleRestaurant(resId);
      setRestaurant(restaurantInfo);
      setMenuItem(menuItemData);

      setLoading(false);
    };

    getSingleMenuItem();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-2xl font-bold text-main-green">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full pt-[70px]">
      <div className="flex justify-center items-center w-full lg:w-[50%] p-2">
        <Image
          src={menuItem.image || MenuItemImg}
          alt="MenuItem image"
          width={300}
          height={300}
          priority={true}
          className="object-cover rounded-md w-full h-full "
        />
      </div>
      <div className="flex flex-col justify-center items-start px-4 m-2 w-full lg:w-[50%]">
        <div className="flex items-center space-x-2 ml-5">
          <div className="w-[100] h-[100]">
            <Image
              src={restaurant.image || ResImage}
              alt="Menu Item Image"
              width={75}
              height={75}
              className="rounded-full w-[80px] h-[80px] object-cover"
              priority="true"
            />
          </div>
          <div>
            {/* to be replaced with {restaurant.name} */}
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
          </div>
        </div>
        <div className="w-full mt-4 p-2">
          <div className="flex justify-between w-full m-2 p-2">
            <h1 className="text-xl font-bold justify-start">{menuItem.name}</h1>

            <h1 className="text-xl font-bold justify-end">
              {menuItem.price} JOD
            </h1>
          </div>
          <div className=" w-full p-2 m-2">
            <p>{menuItem.description}</p>
          </div>
          <div
            className="flex w-full justify-center pt-5"
            onClick={handleAddToCart}
          >
            <Btn text="Add to Cart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuItem;
