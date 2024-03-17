"use client";
import React, { useEffect, useState } from "react";
import Logo from "./navbar/Logo";
import { GiShoppingCart } from "react-icons/gi";
import Link from "next/link";
import User from "./navbar/User";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to handle local storage change event
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      setCart(storedCart);
    };

    // Add event listener for storage change
    window.addEventListener("storage", handleStorageChange);

    // Initial setup
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
    setUser(storedUser);
    setLoading(false);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // console.log(cart);
  return (
    <nav className="flex justify-between w-full bg-white sticky top-0 z-50 text-black [font-family:'Inter-Medium',Helvetica] text-base">
      <section className="flex items-center gap-2 flex-wrap  justify-between pl-3 pt-2 py-2">
        <Logo />

        {/* List of Links */}
        <ul className=" md:flex gap-x-3  justify-evenly md:items-center pl-10">
          <li className="md:ml-3  text-black hover:text-main-green">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="md:ml-3  text-black hover:text-main-green">
            <Link href={"/restaurant"}>Restaurants</Link>
          </li>
          <li className="md:ml-3  text-black hover:text-main-green">
            <Link href={"/about"}>About Us</Link>
          </li>
          {/* conditional rendering of My Restaurants if admin is logged in */}
          {user && user.isAdmin && (
            <li className="md:ml-3  text-black hover:text-main-green">
              <Link href={"/my-restaurant"}>My Restaurant</Link>
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
              {cart && (
                <div className="absolute top-0 right-0 bg-red-500 rounded-full flex justify-center items-center w-[16px] h-[16px] text-white text-[10px]">
                  {cart.length}
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
