import React from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-col items-center pt-24">
      <LoginForm />
      <p className="text=[20px]">
        Not a member?{" "}
        <spam className="text-main-green hover:text-opacity-70">
          <Link href={"/signup"}>Register Now</Link>
        </spam>
      </p>
    </div>
  );
};

export default Login;
