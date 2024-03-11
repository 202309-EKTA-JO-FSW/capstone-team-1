import React from "react";

const SignupMessage = ({ signupRes }) => {
  // set the coolor according to the error message
  const msgColor =
    signupRes === "Signup successful" ? "bg-green-400" : "bg-red-400";

  return (
    signupRes !== "" && (
      <div
        className={`absolute top-10 left-8 text-white px-4 py-2 rounded ${msgColor}`}
      >
        <h1>{signupRes}</h1>
      </div>
    )
  );
};

export default SignupMessage;
