"use client";
import { googleLoginUrl } from "@/app/lib/utils";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const handleGoogleLogin = async () => {
    window.location.href = googleLoginUrl;
  };

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
