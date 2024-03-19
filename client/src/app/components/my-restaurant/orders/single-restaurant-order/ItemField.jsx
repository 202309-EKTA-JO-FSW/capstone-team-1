import React from "react";

const ItemField = ({ item }) => {
  return (
    <div className="flex justify-between items-center text-base w-full p-1 mb-3 border-b border-[#dedede] capitalize">
      <div className="flex justify-between w-[50%]">
        <p>{item.menuItem.name}</p>
        <p>{item.quantity}</p>
      </div>
      <p>{item.total} JD</p>
    </div>
  );
};

export default ItemField;
