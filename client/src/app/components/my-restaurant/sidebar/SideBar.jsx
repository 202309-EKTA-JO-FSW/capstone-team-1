"use client";
import { IoRestaurant } from "react-icons/io5";
import { IoFastFoodSharp } from "react-icons/io5";
import { IoReceipt } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarBtn from "../../SidebarBtn";
import LogoutBtn from "../../LogoutBtn";
const SideBar = () => {
  // get url path
  const pathname = usePathname();
  const mainPath = "my-restaurant";
  // sidebar contents
  const contents = [
    { name: "profile", icon: <IoRestaurant />, path: "" },
    { name: "menu items", icon: <IoFastFoodSharp />, path: "/menuItems" },
    { name: "orders", icon: <IoReceipt />, path: "/orders" },
  ];

  return (
    <div className="sidebar">
      <div className="flex md:flex-col">
        {contents.map((content) => (
          <div key={content.name}>
            <Link href={`/${mainPath}/${content.path}`}>
              <SidebarBtn
                content={content}
                mainPath={mainPath}
                pathname={pathname}
              />
            </Link>
          </div>
        ))}
      </div>
      <LogoutBtn />
    </div>
  );
};

export default SideBar;
