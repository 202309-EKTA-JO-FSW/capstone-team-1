import Link from "next/link";
import React from "react";

const NavBar = () => {
  return <div>
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
