"use client";
import { useState } from "react";
import AuthMessage from "../AuthMessage";
import SignupInfoForm from "./SignupInfoForm";

const SignupInfo = () => {
  const [signupRes, setSignupRes] = useState("");
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
