"use client";
import { IoRestaurant } from "react-icons/io5";
import { IoFastFoodSharp } from "react-icons/io5";
import { IoReceipt } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarBtn from "../../SidebarBtn";
const SideBar = () => {
  // get url path
  const pathname = usePathname();

  // sidebar contents
  const contents = [
    { name: "profile", icon: <IoRestaurant />, path: "" },
    { name: "menu items", icon: <IoFastFoodSharp />, path: "/menuItem" },
    { name: "orders", icon: <IoReceipt />, path: "/order" },
  ];

  return (
    <div className="sidebar">
      {contents.map((content) => (
        <div key={content.name}>
          <Link href={`/my-restaurant/${content.path}`}>
            <SidebarBtn content={content} pathname={pathname} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
