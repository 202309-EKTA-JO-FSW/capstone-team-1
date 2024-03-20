"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";
import GoogleAuth from "../GoogleAuth";
import AuthMessage from "../AuthMessage";
import { useAppSelector } from "@/app/redux/hooks";
import { useEffect } from "react";

const Login = () => {
  const [loginRes, setLoginRes] = useState("");
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

  const handleLogin = (loginMsg) => {
    setLoginRes(loginMsg);
  };

  return (
    <div className="flex flex-col items-center pt-24">
      <LoginForm onLogin={handleLogin} />

      {/* or line */}
      <div className="w-[250px] sm:w-[380px]  flex justify-center items-center">
        <div className="w-full h-[1px] bg-gray-400"></div>
        <div className="mx-2">or</div>
        <div className="w-full h-[1px] bg-gray-400"></div>
      </div>
      <GoogleAuth />
      {/* navigate the user to signup page */}
      <p className="text=[20px]">
        Not a member?{" "}
        <span className="text-main-green hover:text-opacity-70">
          <Link href={"/signup"}>Register Now</Link>
        </span>
        {/* login messages comes from backend */}
      </p>
      <AuthMessage resMsg={loginRes} msg={"Login successful"} />
    </div>
  );
};

export default Login;
