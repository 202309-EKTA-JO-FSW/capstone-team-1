"use client";
import { useState } from "react";
import SignupForm from "./SignupForm";
import SignupMessage from "./SignupMessage";

const Signup = () => {
  const [signupRes, setSignupRes] = useState("");
  const handleSignup = (signupRes) => {
    setSignupRes(signupRes);
  };
  console.log(signupRes);
  return (
    <div className="flex justify-center">
      <SignupForm onSignup={handleSignup} />
      <SignupMessage signupRes={signupRes} className="static" />
    </div>
  );
};

export default Signup;
