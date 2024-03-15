import React from "react";

const AuthMessage = ({ resMsg, msg }) => {
  // set the coolor according to the error message
  const msgColor = resMsg === msg ? "bg-green-400" : "bg-red-400";

  return (
    resMsg !== "" && (
      <div
        className={`absolute top-15 left-8 text-white px-4 py-2 rounded ${msgColor}`}
      >
        <h1>{resMsg}</h1>
      </div>
    )
  );
};

export default AuthMessage;
