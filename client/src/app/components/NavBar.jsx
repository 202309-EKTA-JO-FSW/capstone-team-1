'use client'
import React, { useEffect, useState } from "react";
import Logo from "./navbar/Logo";
import Btn from "./navbar/Btn";
import NavLinks from "./navbar/NavLinks";
import {GiShoppingCart} from "react-icons/gi"
import Link from "next/link";




const NavBar = () => {

  const [user, setUser] = useState({})

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
   setUser(user);
  }
}, []);



  return (
    
    <nav className="flex justify-between  w-full sticky bg-white top-0 [font-family:'Poppins-Medium',Helvetica] font-medium ">
        <section className="flex items-center gap-3 flex-wrap  justify-center">
          <Logo />
          <NavLinks/>
          {/* conditional rendering of My Restaurants if admin is logged in */}
          {(user && user.isAdmin) &&
           <Link href="/admin/myrestaurant" className= "md:ml-3  text-black hover:text-main-green">My Restaurants</Link>
          }
          
        </section>
        <section className="flex items-center gap-3 flex-wrap  justify-between">
          <Link href="/customer/cart">
           <GiShoppingCart className="text-2xl hover:text-main-green"/>
          </Link>
          {/* condtional rendering of Login button or name of user if logged in */}
          {user 
          ? <p>Hello, {user.name}</p>
          : <Link href="/login">
          <Btn text={'LOGIN'}/>
          </Link>
          }
        </section>
       
    </nav>
  )
};

 export default NavBar;
