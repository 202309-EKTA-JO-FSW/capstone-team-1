import React from "react";

const LoginMessage = ({ loginRes }) => {
  // set the coolor according to the error message
  const msgColor =
    loginRes === "Login successful" ? "bg-green-400" : "bg-red-400";

  return (
    loginRes !== "" && (
      <div
        className={`absolute top-10 left-8 text-white px-4 py-2 rounded ${msgColor}`}
      >
        <h1>{loginRes}</h1>
      </div>
    )
  );
};

export default LoginMessage;
