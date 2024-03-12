"use client";
import { fetchGoogleUser } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GoogleUser = () => {
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const user = await fetchGoogleUser();
      console.log(user);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      }
    };
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl text-center mt-10 font-bold">
        Authenticating......
      </h1>
    </div>
  );
};

export default GoogleUser;
