import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ItemCard = ({ cart, setClickedItem }) => {
  return (
    <div className="flex justify-between items-center w-full p-1 mb-3 border-b border-[#dedede]">
      <div className="flex justify-between w-[55%] text-xl ">
        <p>{cart.menuItem.name}</p>
        <p>{cart.total} $</p>
      </div>
      <div className="flex items-center rounded-lg text-white text-xl">
        <FaMinus
          className="text-xl cursor-pointer rounded-l-md p-1 bg-main-green hover:bg-opacity-70"
          onClick={() =>
            setClickedItem({ status: "remove", id: cart.menuItem._id })
          }
        />
        <p className="px-1 text-black">{cart.quantity}</p>
        <FaPlus
          className="text-xl cursor-pointer rounded-r-md p-1 bg-main-green hover:bg-opacity-70"
          onClick={() =>
            setClickedItem({ status: "add", id: cart.menuItem._id })
          }
        />
      </div>
    </div>
  );
};

export default ItemCard;
