import React from "react";

const Btn = ({ text }) => {
  return (
    <button className="bg-main-green w-[120px] py-3 text-center rounded-3xl text-white text-sm hover:bg-opacity-75">
      {text}
    </button>
  );
};

export default Btn;
