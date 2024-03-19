"use client";
import React, { useEffect, useState } from "react";
import Logo from "./navbar/Logo";
import { GiShoppingCart } from "react-icons/gi";
import Link from "next/link";
import User from "./navbar/User";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/features/auth/AuthSlice";
import { fetchCart } from "../lib/data";
import { itemsCount } from "../redux/features/cart/CartSlice";
import FreshFix from "../../../public/FreshFix.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState(null);
  // const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLogin = useAppSelector((state) => state.authReducer.value);
  const currentPath = usePathname();

  useEffect(() => {
    // Function to handle local storage change event
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    // Add event listener for storage change
    window.addEventListener("storage", handleStorageChange);

    // Initial setup
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUser(storedUser);
    setLoading(false);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Dispatch login action if user is logged in
    if (user) {
      dispatch(login());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const getCart = async () => {
      if (isLogin) {
        const cart = await fetchCart();
        dispatch(itemsCount(cart.itemsCount));
      }
    };
    getCart();
  }, []);

  // get items count in cart
  const cartItemsCount = useAppSelector((state) => state.cartReducer.value);

  return (
    <nav className="flex justify-between w-full bg-white sticky top-0 z-50  text-black [font-family:'Inter-Medium',Helvetica] text-base">
      <section className="flex items-center gap-2 flex-wrap  justify-between pl-2 py-2">
        <div className="flex flex-row justify-start items-start">
          <Logo />
          <Link href="/">
            <Image
              src={FreshFix}
              alt="FreshFix"
              width={100}
              height={50}
              priority="true"
            />
          </Link>
        </div>
        {/* List of Links */}
        <ul className=" md:flex gap-x-3  justify-evenly md:items-center pl-6 pt-1">
          <li className="md:ml-3 ">
            <Link
              href={"/"}
              className={
                currentPath === "/"
                  ? "text-main-green font-semibold "
                  : "text-black hover:text-main-green"
              }
            >
              Home
            </Link>
          </li>
          <li className="md:ml-3  ">
            <Link
              href={"/restaurant"}
              className={
                currentPath === "/restaurant"
                  ? "text-main-green font-semibold  "
                  : "text-black hover:text-main-green"
              }
            >
              Restaurants
            </Link>
          </li>
          <li className="md:ml-3 ">
            <Link
              href={"/about"}
              className={
                currentPath === "/about"
                  ? "text-main-green font-semibold "
                  : "text-black hover:text-main-green"
              }
            >
              About Us
            </Link>
          </li>
          {/* conditional rendering of My Restaurants if admin is logged in */}
          {user && user.isAdmin && (
            <li className="md:ml-3 ">
              <Link
                href={"/my-restaurant"}
                className={
                  currentPath === "/my-restaurant"
                    ? "text-main-green font-semibold "
                    : "text-black hover:text-main-green"
                }
              >
                My Restaurant
              </Link>
            </li>
          )}
        </ul>
      </section>

      {loading ? (
        <div></div>
      ) : (
        <section className="flex items-center gap-2 flex-wrap pr-3 pt-2 py-2">
          {/* condtional rendering of Login button or name of user if logged in */}
          <Link href="/cart">
            <div className="relative w-[35px]">
              <GiShoppingCart className="text-3xl hover:text-main-green" />
              {cartItemsCount > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 rounded-full flex justify-center items-center w-[16px] h-[16px] text-white text-[10px]">
                  {cartItemsCount}
                </div>
              )}
            </div>
          </Link>
          <User user={user} />
        </section>
      )}
    </nav>
  );
};

export default NavBar;
