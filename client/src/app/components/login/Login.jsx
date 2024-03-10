"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";
import LoginMessage from "./LoginMessage";

const Login = () => {
  const [loginRes, setLoginRes] = useState("");

  const handleLogin = (loginMsg) => {
    setLoginRes(loginMsg);
  };
  return (
    <div className="flex flex-col items-center pt-24">
      <LoginForm onLogin={handleLogin} />

      {/* navigate the user to signup page */}
      <p className="text=[20px]">
        Not a member?{" "}
        <span className="text-main-green hover:text-opacity-70">
          <Link href={"/signup"}>Register Now</Link>
        </span>
        {/* login messages comes from backend */}
      </p>
      <LoginMessage loginRes={loginRes} />
    </div>
  );
};

export default Login;
