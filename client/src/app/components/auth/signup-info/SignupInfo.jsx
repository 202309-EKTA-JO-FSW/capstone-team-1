"use client";
import { useEffect, useState } from "react";
import AuthMessage from "../AuthMessage";
import SignupInfoForm from "./SignupInfoForm";
import { useAppSelector } from "@/app/redux/hooks";

const SignupInfo = () => {
  const [signupRes, setSignupRes] = useState("");
  const [loading, setLoading] = useState(true);

  const user = useAppSelector((state) => state.authReducer.value);

  useEffect(() => {
    if (user.isLogin) {
      setLoading(false); // Set loading to false to skip form rendering
    }
  }, [user]);

  // checking if user is logged in
  if (user.isLogin) {
    return (
      <div className="text-2xl font-bold text-main-green w-full text-center mt-[15%]">
        <p>Already loged In</p>
      </div>
    );
  }

  if (loading) {
    return null;
  }

  const handleSignup = (signupRes) => {
    setSignupRes(signupRes);
  };
  return (
    <div className="flex flex-col items-center pt-24">
      <SignupInfoForm onSignup={handleSignup} />
      <AuthMessage resMsg={signupRes} msg={"Update user successful"} />
    </div>
  );
};

export default SignupInfo;
