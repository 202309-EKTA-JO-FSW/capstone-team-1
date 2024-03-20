"use client";
import { useEffect, useState } from "react";
import SignupForm from "./SignupForm";
import Link from "next/link";
import GoogleAuth from "../GoogleAuth";
import AuthMessage from "../AuthMessage";
import { useAppSelector } from "@/app/redux/hooks";
import IsLogin from "../../isLogin/IsLogin";

const Signup = () => {
  const [signupRes, setSignupRes] = useState("");
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

  const handleSignup = (signupRes) => {
    setSignupRes(signupRes);
  };

  return (
    <div className="flex flex-col items-center">
      <SignupForm onSignup={handleSignup} />
      {/* or line */}
      <div className="w-[250px] sm:w-[380px]  flex justify-center items-center">
        <div className="w-full h-[1px] bg-gray-400"></div>
        <div className="mx-2">or</div>
        <div className="w-full h-[1px] bg-gray-400"></div>
      </div>
      <GoogleAuth />
      {/* navigate the user to signup page */}
      <p className="text=[20px]">
        I'm already a member{" "}
        <span className="text-main-green hover:text-opacity-70">
          <Link href={"/login"}>Log In</Link>
        </span>
        {/* login messages comes from backend */}
      </p>
      <AuthMessage resMsg={signupRes} msg={"Signup successful"} />
    </div>
  );
};

export default Signup;
