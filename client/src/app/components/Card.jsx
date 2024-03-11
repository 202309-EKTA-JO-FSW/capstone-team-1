import React from "react";

function Card({ children }) {
  return (
    <div className="bg-white shadow-inner rounded-lg overflow-hidden">
      {children}
    </div>
  );
}

export default Card;
