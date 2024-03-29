"use client";
import Image from "next/image";
import menuItemImage from "../../../../../public/image/menuItem-image-placeholder.png";
import { FaStar } from "react-icons/fa";
import { fetchPostCart } from "@/app/lib/data";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { itemsCount } from "@/app/redux/features/cart/CartSlice";
import { useRouter } from "next/navigation";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";
import Link from "next/link";

const MenuItemCard = ({ menuItem, id }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.value);
  const router = useRouter();

  const handleAddToCart = async () => {
    // check if user loged in, if not navigate him to login page
    if (user.isLogin === false) {
      router.push("/login");
    }

    const cart = await fetchPostCart(menuItem._id);
    // update the message state
    dispatch(actionMsg(cart.message));

    // change the cart status to added items
    if (user.isLogin && cart) {
      dispatch(itemsCount(cart.results.cart.itemsCount));
    }
  };

  return (
    <div className="bg-white shadow-lg border border-gray-100 rounded-md p-4 flex flex-col items-center m-5 w-[280px] h-[350px]">
      <Link
        href={`/restaurant/${id}/${menuItem._id}`}
        className="w-full h-[85%] flex flex-col items-center"
      >
        <div className="relative h-[250px] w-full mb-2 rounded overflow-hidden">
          <Image
            src={menuItem.image || menuItemImage}
            alt={menuItem.name}
            sizes="200vw"
            priority={true}
            className=" object-cover"
            fill
          />
        </div>
        <div className="w-full mb-1">
          <h3 className="text-lg font-bold text-center">{menuItem.name}</h3>
          <p className="truncate overflow-hidden whitespace-nowrap w-full text-gray-500">
            {menuItem.description}
          </p>
        </div>

        <div className="flex justify-between w-full">
          <div>
            <p className="text-lg font-semibold">{`${menuItem.price} ${
              menuItem.currency || "JD"
            }`}</p>
          </div>
          <div className="flex items-center">
            <span className="mr-1">{menuItem.rating || 4.5}</span>
            <FaStar className=" text-yellow-300" />
          </div>
        </div>
      </Link>
      <div className="flex justify-center w-full mt-2 h-[15%]">
        <button
          onClick={handleAddToCart}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
