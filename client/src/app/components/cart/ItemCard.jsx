import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ItemCard = ({ cart }) => {
  return (
    <div
      key={cart.menuItem._id}
      className="flex justify-between items-center w-full p-1 mb-3 border-b border-[#dedede]"
    >
      <div className="flex justify-between w-[55%]">
        <p>{cart.menuItem.name}</p>
        <p>{cart.total} $</p>
      </div>
      <div className="flex items-center rounded-lg text-white">
        <FaMinus className="text-xl cursor-pointer rounded-l-md p-1 bg-main-green hover:bg-opacity-70" />
        <p className="px-1 text-black">{cart.quantity}</p>
        <FaPlus className="text-xl cursor-pointer rounded-r-md p-1 bg-main-green hover:bg-opacity-70" />
      </div>
    </div>
  );
};

export default ItemCard;
