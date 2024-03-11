"use client";
import { fetchGoogleAuth } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";

const GoogleAuth = () => {
  const router = useRouter();
  const [googleLogin, setGoogleLogin] = useState({});
  const [token, setToken] = useState("");
  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:3001/api/auth/google";

    const googleLoginRef = await fetchGoogleAuth();

    if (googleLoginRef.user) {
      console.log("TOKEN: ", Cookies.get("token"));
      setToken(Cookies.get("token"));
      setGoogleLogin(googleLoginRef.user);
      router.push("/");
    }
  };

  // check if the user login succefully to store the details in local storage
  useEffect(() => {
    if (googleLogin.user) {
      localStorage.setItem("user", JSON.stringify(googleLogin.user));
    }
  }, [googleLogin]);

  return (
    <div className="my-5">
      <button
        onClick={handleGoogleLogin}
        className="py-2 px-4 w-full sm:w-[380px] flex justify-center items-center hover:bg-gray-100 text-gray-500 border border-gray-200 rounded shadow"
      >
        <div className="flex">
          <FcGoogle className="text-2xl mr-3" />
          Sign in with Google
        </div>
      </button>
    </div>
  );
};

export default GoogleAuth;
