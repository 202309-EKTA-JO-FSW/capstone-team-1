'use client'
import React, { useEffect, useState } from "react";
import Logo from "./navbar/Logo";
import Btn from "./navbar/Btn";
import NavLinks from "./navbar/NavLinks";
import {GiShoppingCart} from "react-icons/gi"
import Link from "next/link";
import Image from "next/image";



const NavBar = () => {

  const [user, setUser] = useState(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user'))
    return storedUser || {firstname: "Hala", isAdmin:true}
  });

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
   setUser(user);
  }
}, []);


const placeholderImage = "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image.png"
  return (
    
    <nav className="flex justify-between  w-full sticky top-0 text-black">
        <section className="flex items-center gap-2 flex-wrap  justify-between pl-3 pt-2 py-2">
          <Logo />
          <NavLinks/>
          
          {/* conditional rendering of My Restaurants if admin is logged in */}
          {(user && user.isAdmin) &&
           <Link href="/myrestaurant" className= "md:ml-3  text-black hover:text-main-green">My Restaurant</Link>
          }
          
        </section>
        <section className="flex items-center gap-4 flex-wrap  justify-between pr-3 pt-2 py-2">
          <Link href="/checkout">
           <GiShoppingCart className="text-3xl  hover:text-main-green"/>
          </Link>
          {/* condtional rendering of Login button or name of user if logged in */}
          {user.firstname
          ? <div className= "flex flex-wrap items-center justify-between " >
            <Link href={"/profile"}>
            {/* conditional rendering of avatar */}
            <Image style={{borderRadius: "30px"}} src={user.avatar|| placeholderImage} alt="User Avatar" width={30} height={30}/>
            </Link>
            <Link href={"/profile"}>
            <p className="hover:text-main-green pr-2 pl-2">Hello, {user.firstname}</p>
            </Link>
            <Link href={"/logout"}>
              <Btn text={"LOGOUT"}/>
            </Link>
            </div>
          : <Link href="/login">
          <Btn text={'LOGIN'}/>
          </Link>
          }
        </section>
       
    </nav>
  )
};

 export default NavBar;
