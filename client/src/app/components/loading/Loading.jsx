import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center mt-[18%]">
      {/* <p className="text-3xl font-bold text-main-green">Loading...</p> */}
      <CircularProgress sx={{ color: "#39DB4A" }} size={50} />
    </div>
  );
};

export default Loading;
