import React from "react";
import Logo from "./navbar/Logo";
import Button from "./navbar/Button";
import NavLinks from "./navbar/NavLinks";
import {GiShoppingCart} from "react-icons/gi"
import Link from "next/link";




const NavBar = () => {
  let isLoggedIn = window.localStorage.getItem('token', JSON.stringify(token))
  let user = window.localStorage.getItem('user', JSON.stringify(user))

  return (
    
    <nav className="flex justify-between  w-full sticky bg-white top-0 [font-family:'Poppins-Medium',Helvetica] font-medium ">
        <section className="flex items-center gap-3 flex-wrap  justify-center">
          <Logo />
          <NavLinks/>
          <Link href="/admin/restaurant" className= "md:ml-3  text-black hover:text-main-green">My Restaurants</Link>
        </section>
        <section className="flex items-center gap-3 flex-wrap  justify-between">
          <Link href="/customer/cart">
           <GiShoppingCart className="text-2xl hover:text-main-green"/>
          </Link>
          {isLoggedIn
          ? <p>Hello, {user.name}</p>
          : <Link href="/auth/login">
          <Button/>
          </Link>
          
}
        </section>
       
    </nav>
  )
};

 export default NavBar;
