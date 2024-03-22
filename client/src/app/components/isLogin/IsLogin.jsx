"use client";
import Link from "next/link";
import React from "react";

const IsLogin = ({ login }) => {
  if (login) {
    return (
      <div className="text-2xl font-bold text-main-green w-full text-center mt-[15%]">
        <p>Already loged In</p>
      </div>
    );
  }

  return (
    <Link href={"/login"}>
      <div className="text-2xl font-medium text-main-green w-full text-center mt-[15%]">
        Please,{" "}
        <span className="text-gray-300 border-b hover:text-main-green cursor-pointer">
          Login
        </span>
      </div>
    </Link>
  );
};

export default IsLogin;
