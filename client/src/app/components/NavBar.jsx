import React from "react";
import Logo from "./navbar/Logo";
import Button from "./navbar/Button";
import NavLinks from "./navbar/NavLinks";
import {GiShoppingCart} from "react-icons/gi"
import Link from "next/link";


const NavBar = () => {
  return (
    
    <nav className="flex justify-between  w-full sticky bg-white top-0  ">
        <section className="flex items-center gap-3 flex-wrap  justify-between">
          <Logo />
          <NavLinks/>
        </section>
        <section className="flex items-center gap-3 flex-wrap  justify-between">
          <Link href="/customer/cart">
           <GiShoppingCart className="text-2xl hover:text-main-green"/>
          </Link>
          <Button/>
        </section>
       
    </nav>
  )
};

 export default NavBar;
