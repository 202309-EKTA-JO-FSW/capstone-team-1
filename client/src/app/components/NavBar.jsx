import React from "react";
import Logo from "./navbar/Logo";
import Button from "./navbar/Button";
import NavLinks from "./navbar/NavLinks";
import {GiShoppingCart} from "react-icons/gi"
import Link from "next/link";




const NavBar = () => {
  if (typeof window !== 'undefined' && window.localStorage.getItem('user')){
    user = JSON.parse(window.localStorage.getItem('user'))
  }

  return (
    
    <nav className="flex justify-between  w-full sticky bg-white top-0 [font-family:'Poppins-Medium',Helvetica] font-medium ">
        <section className="flex items-center gap-3 flex-wrap  justify-center">
          <Logo />
          <NavLinks/>
          {/* conditional rendering of My Restaurants if admin is logged in */}
          {user.isAdmin &&
           <Link href="/admin/restaurant" className= "md:ml-3  text-black hover:text-main-green">My Restaurants</Link>
          }
          
        </section>
        <section className="flex items-center gap-3 flex-wrap  justify-between">
          <Link href="/customer/cart">
           <GiShoppingCart className="text-2xl hover:text-main-green"/>
          </Link>
          {/* condtional rendering of Login button or name of user if logged in */}
          {user 
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
