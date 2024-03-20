"use client";
import { useAppSelector } from "@/app/redux/hooks";
import ProfileSidebar from "../../components/profile/profile-sidebar/ProfileSidebar";
import { useEffect, useState } from "react";
import IsLogin from "@/app/components/isLogin/IsLogin";

const ProfileLayout = ({ children }) => {
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

  return (
    <section className="flex flex-col md:flex-row">
      <ProfileSidebar />
      {children}
    </section>
  );
};

export default ProfileLayout;
