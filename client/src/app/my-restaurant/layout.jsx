"use client";
import { useEffect, useState } from "react";
import SideBar from "../components/my-restaurant/sidebar/SideBar";
import { useAppSelector } from "../redux/hooks";
import IsLogin from "../components/isLogin/IsLogin";

const MyRestaurantLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const user = useAppSelector((state) => state.authReducer.value);

  useEffect(() => {
    if (user) {
      setLoading(false); // Set loading to false to skip form rendering
    }
  }, [user]);

  if (loading) {
    return null;
  }

  // checking if user is logged in
  if (user.isLogin === false) {
    return <IsLogin login={user.isLogin} />;
  }

  // check if user is admin
  if (user && user.isAdmin === false) {
    return (
      <div className="text-xl font-bold text-main-green w-full text-center mt-[15%] px-2">
        <p>
          Access denied, you have to be an owner of the restaurant to reach this
          page.
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col md:flex-row">
      <SideBar />
      {children}
    </section>
  );
};

export default MyRestaurantLayout;
