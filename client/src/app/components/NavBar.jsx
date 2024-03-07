import Link from "next/link";
import React from "react";
import Logo from "./navbar/Logo";
const NavBar = () => {
  return <div>
    <Logo/>
    <ul>
      <li>
    <Link href="/">Home</Link>
    </li>
    <li>
    <Link href="/restaurant">Restaurants</Link>
    </li>
    <li>
    <Link href="/about"> About Us</Link>
    </li>
    
</ul>
  </div>;
};

export default NavBar;
