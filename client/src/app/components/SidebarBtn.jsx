import React from "react";

const SidebarBtn = ({ content, pathname, mainPath }) => {
  let active;
  if (pathname === `/${mainPath + content.path}`) {
    active = "bg-white rounded-lg";
  } else {
    active = "bg-transparent";
  }
  return (
    <div className={`sidebar-btn ${active}`}>
      <div>{content.icon}</div>
      <p className="pl-2 capitalize">{content.name}</p>
    </div>
  );
};

export default SidebarBtn;
