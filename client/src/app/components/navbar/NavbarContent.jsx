import { usePathname } from "next/navigation";
import React from "react";

const NavbarContent = ({ content }) => {
  const currentPath = usePathname();

  const isActive = (path) => {
    return path === "/" ? currentPath === path : currentPath.startsWith(path);
  };

  return (
    <li className="md:ml-3 ">
      <div
        className={
          isActive(content.path)
            ? "text-main-green font-semibold"
            : "text-black hover:text-main-green"
        }
      >
        {content.name}
      </div>
    </li>
  );
};

export default NavbarContent;
