"use client";
import Image from "next/image";
import menuItemImage from "../../../../../public/image/menuItem-image-placeholder.png";
import { fetchPostCart } from "@/app/lib/data";
import { useAppDispatch } from "@/app/redux/hooks";
import { itemsCount } from "@/app/redux/features/cart/CartSlice";

const MenuItemCard = ({ menuItem }) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    const cart = await fetchPostCart(menuItem._id);

    // change the cart status to added items
    if (cart) dispatch(itemsCount(cart.results.cart.itemsCount));
  };

  if (!menuItem) {
    return <div className="text-center">No items available</div>;
  }

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 flex flex-col items-center mx-4"
      style={{ width: 250, height: 300 }}
    >
      <div className="relative w-[200px] h-[192px] mb-2">
        <Image
          src={menuItem.image || menuItemImage}
          alt={menuItem.name}
          fill
          sizes="200vw"
          priority={true}
          className=" object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-center mb-6">{menuItem.name}</h3>
      <div className="flex justify-between w-full">
        <div>
          <p className="text-lg font-semibold">{`${menuItem.price} ${
            menuItem.currency || "JOD"
          }`}</p>
        </div>
        <div className="flex items-center">
          <span className="mr-1">{menuItem.rating || 4.5}</span>
          &#9733;
        </div>
      </div>
      <div className="flex justify-center w-full mt-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
