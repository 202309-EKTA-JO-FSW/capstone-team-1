import { IoLogOutOutline } from "react-icons/io5";

const LogoutBtn = () => {
  return (
    <button className="sidebar-btn">
      <IoLogOutOutline className="text-2xl" />{" "}
      <span className="pl-1">Log out</span>
    </button>
  );
};

export default LogoutBtn;
