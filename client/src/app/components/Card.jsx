import React from "react";

function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {children}
    </div>
  );
}

export default Card;
