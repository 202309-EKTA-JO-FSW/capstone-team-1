import React from "react";
import LoadingBtn from "./LoadingBtn";

const Btn = ({ text, loadingBtn }) => {
  return (
    <button className="bg-main-green w-[120px] py-3 text-center font-bold rounded-3xl text-white text-sm hover:bg-opacity-75">
      {loadingBtn ? <LoadingBtn /> : text}
    </button>
  );
};

export default Btn;
