import React from "react";

const Btn = ({ text }) => {
  return (
    <button className="bg-main-green py-3 px-8 rounded-3xl text-white text-sm hover:bg-opacity-75">
      {text}
    </button>
  );
};

export default Btn;