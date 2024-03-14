import React from "react";

function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden  hover:bg-violet-100">
      {children}
    </div>
  );
}

export default Card;
