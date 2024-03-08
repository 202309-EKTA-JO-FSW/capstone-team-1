import React from 'react'
import Link from 'next/link'
const NavLinks = () => {

    const Links =[
        {name: "Home", link:"/"},
        {name: "Restaurants", link:"/restaurant"},
        {name: "About Us", link:"/about"},
        

    ]
  return (
    <ul className=" md:flex gap-x-8  justify-evenly md:items-center" >
        {
            Links.map((link)=>(
                <li key={link.name} className= "md:ml-3  text-black hover:text-main-green">
                    <Link href={link.link}>{link.name}</Link>
                </li>
            ))
        }
    
</ul>
  )
}

export default NavLinks