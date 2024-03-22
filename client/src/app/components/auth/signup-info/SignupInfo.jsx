"use client";
import { useEffect, useState } from "react";
import SignupInfoForm from "./SignupInfoForm";
import { useAppSelector } from "@/app/redux/hooks";
import IsLogin from "../../isLogin/IsLogin";

const SignupInfo = () => {
  const [loading, setLoading] = useState(true);

  const user = useAppSelector((state) => state.authReducer.value);

  useEffect(() => {
    if (user) {
      setLoading(false); // Set loading to false to skip form rendering
    }
  }, [user]);

  // checking if user is logged in
  if (user.isLogin === true) {
    return <IsLogin login={user.isLogin} />;
  }

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col items-center pt-24">
      <SignupInfoForm />
    </div>
  );
};

export default SignupInfo;
