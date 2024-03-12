"use client";
import { fetchGoogleUser } from "@/app/lib/data";
import { useEffect } from "react";

const GoogleUser = () => {
  useEffect(() => {
    const getData = async () => {
      const user = await fetchGoogleUser();
      console.log(user);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    };
    getData();
  }, []);
  return <div></div>;
};

export default GoogleUser;
