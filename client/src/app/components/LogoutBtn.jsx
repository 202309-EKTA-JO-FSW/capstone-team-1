"use client";
import { IoLogOutOutline } from "react-icons/io5";
import { fetchLogout } from "../lib/data";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  // handle logout
  const handleLogout = async () => {
    const logout = await fetchLogout();
    console.log(logout);
    if (logout) {
      // if logout suuccefully empty local storage
      localStorage.clear();
      window.dispatchEvent(new Event("storage"));

      // navigate to home page
      router.push("/");
    }
  };
  return (
    <button className="sidebar-btn" onClick={handleLogout}>
      <IoLogOutOutline className="text-2xl" />{" "}
      <span className="pl-1">Log out</span>
    </button>
  );
};

export default LogoutBtn;
